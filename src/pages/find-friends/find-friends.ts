import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {AlertController} from "ionic-angular/components/alert/alert-controller";

@Component({
  selector: 'page-find-friends',
  templateUrl: 'find-friends.html',
})
export class FindFriendsPage {

  users: any;
  friendReqestsSent: any;
  tempUser: any;
  matchUsers: any;
  userObject: any;
  frinedsList: any;
  userRequestTemp: any
  friendsTemp: any
  constructor(public alertCtrl: AlertController, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
    this.retriveUsers();
    this.storage.get('userObject').then((data) => {
      this.userObject = data;
    });
  }

  findItem(event: any) {
    this.getAllFriendsRequestSent(event);

  }


  getAllFriendsRequestSent(event){

    this.http.get(`http://localhost:8080/friendsrequest/get_all_friend_request/${this.userObject._id}`).subscribe(result => {
      this.friendReqestsSent = result as Array<Object>;
      this.http.get(`http://localhost:8080/friendslist/get_all_friend/${this.userObject._id}`).subscribe(res => {
    //console.log((this.friendReqestsSent[0][0]).friendRequest.username);


        this.matchUsers = [];
        this.userRequestTemp = [];
        this.friendsTemp = [];

        this.frinedsList = res as Array<Object>;

        let val = event.target.value;

        if(val && val.trim() !== ''){
          this.tempUser = this.users.filter((user) => {
            if(user.username.includes(val)){
              if(this.userObject.username != user.username) {
                return user;
              }
            }
          });
        }


        if(this.friendReqestsSent.length != 0){
          for (let j = 0; j < this.tempUser.length; j++) {
            for (let i = 0; i < this.friendReqestsSent.length; i++) {
              if (this.friendReqestsSent[0][i].friendRequest.username == this.tempUser[j].username) {

                if(!this.containsObject(this.tempUser[j], this.userRequestTemp)) {
                  this.userRequestTemp.push(this.tempUser[j]);
                }
              }
            }
          }
        }

        if(this.frinedsList.length != 0){
          for (let j = 0; j < this.tempUser.length; j++) {
            for (let i = 0; i < this.frinedsList.length; i++) {
              if (this.frinedsList[i].friends.username == this.tempUser[j].username) {
                if(!this.containsObject(this.tempUser[j], this.friendsTemp)) {
                  this.friendsTemp.push(this.tempUser[j]);
                }
              }
            }
          }
        }


        if(this.friendReqestsSent.length == 0 && this.frinedsList.length == 0){

          this.matchUsers = this.tempUser;
        }else{
          for (let i = 0; i < this.tempUser.length; i++) {
            if(this.containsObject(this.tempUser[i], this.userRequestTemp) || this.containsObject(this.tempUser[i],this.friendsTemp)) {
            }else{
              this.matchUsers.push(this.tempUser[i]);
            }
          }

        }
      }, (err) => {
        console.log("error" + err);
      });

    }, (err) => {
      console.log("error" + err);
    });
  }

  containsObject(obj, list) {
    if(list.length !=0){
      for(let i = 0; i < list.length; i++){
        if(obj._id == list[i]._id){
          return true;
        }
      }
    }
    return false;

  }

  retriveUsers() {
    this.http.get(`http://localhost:8080/users`).subscribe(res => {
      this.users = res as Array<Object>;

    }, (err) => {
      console.log("error" + err);
    });
  }

  doAddPrompt(friendid){
    let prompt = this.alertCtrl.create({
      title: 'Add Friend',
      message: 'Are you sure you want to add this person as friend!',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            // Close prompt
          }
        },{
          text: 'Add',
          handler: data => {
            this.sendFriendRequest(friendid);
          }
        },
      ]
    });
    prompt.present();
  }

  sendFriendRequest(friendid){
    this.http.post(`http://localhost:8080/friendsrequest/create_friend_request`, {
        sender: this.userObject._id,
        friendRequest: friendid,
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        console.log(res);
      }, (err) => {
        console.log(err);

      });

  }
}
