import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';


@Component({
  selector: 'page-friend-request',
  templateUrl: 'friend-request.html',
})
export class FriendRequestPage {
  userObject: any
  friendRequest: any
  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.storage.get('userObject').then((data) => {
      this.userObject = data;
      this.getFriendRequest();
    });
  }

  getFriendRequest(){
    this.http.get(`http://localhost:8080/friendsrequest/get_friend_request/${this.userObject._id}`).subscribe(res => {
      this.friendRequest = res;
      console.log(res);
    });
  }




}
