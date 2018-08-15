import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  users: any
  friendReqestsSent: any
  matchUsers: any
  userObject: any

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
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
      for (let j = 0; j < this.matchUsers.length; j++) {
        for (let i = 0; i < this.friendReqestsSent.length; i++) {

          if (this.friendReqestsSent[i].friendRequest._id == this.matchUsers[j]._id) {
            console.log("here");
            this.matchUsers.splice(j,1);
          }
        }
      }
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
