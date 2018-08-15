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

  users: any
  friendReqestsSent: any
  matchUsers: any
  userObject: any

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
    this.http.get(`http://localhost:8080/friendsrequest/get_all_friend_request/${this.userObject._id}`).subscribe(res => {
      this.friendReqestsSent = res as Array<Object>;
      let val = event.target.value;
      if(val && val.trim() !== ''){
        this.matchUsers = this.users.filter(function (user) {
          if(user.username.includes(val)){
            return user;
          }
        });
      }
      //
      // for (let j = 0; j < this.matchUsers.length; j++) {
      //   for (let i = 0; i < this.friendReqestsSent.length; i++) {
      //     console.log(this.friendReqestsSent[i].friendRequest.username);
      //     console.log(this.matchUsers[j]);
      //     if (this.friendReqestsSent[i].friendRequest.username == this.matchUsers[j].username) {
      //       console.log("here");
      //       this.matchUsers.splice(j,1);
      //     }
      //   }
      // }
    }, (err) => {
      console.log("error" + err);
    });
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
          text: 'Add',
          handler: data => {
            this.sendFriendRequest(friendid);
          }
        },
        {
          text: 'Cancel',
          handler: data => {
            // Close prompt
          }
        }
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
