import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {AlertController} from "ionic-angular/components/alert/alert-controller";



@Component({
  selector: 'page-friend-request',
  templateUrl: 'friend-request.html',
})
export class FriendRequestPage {
  userObject: any
  friendRequest: any
  constructor(public alertCtrl: AlertController,public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.storage.get('userObject').then((data) => {
      this.userObject = data ;
      this.getFriendRequest();
    });
  }

  getFriendRequest(){
    this.http.get(`http://localhost:8080/friendsrequest/get_friend_request/${this.userObject._id}`).subscribe(res => {
      this.friendRequest = res as Array<Object>;
    });
  }

  doConfirm(friendid) {
    let alert = this.alertCtrl.create({
      title: 'Friend Request',
      message: 'Do you want to accept this person as friend',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.addFriend(friendid);
          }
        }
      ]
    });

    alert.present();
  }

  addFriend(friendsRequest){
    console.log(friendsRequest);
    // yourself - > sender
    this.http.post(`http://localhost:8080/friendslist/add_friend`, {
        user: friendsRequest.friendRequest._id,
        friends: friendsRequest.sender._id,
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {

       console.log(res);
      }, (err) => {
        console.log(err);

      });
    // sender -> yourself
    this.http.post(`http://localhost:8080/friendslist/add_friend`, {
        user: friendsRequest.sender._id,
        friends: friendsRequest.friendRequest._id,
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        this.deleteItem(friendsRequest._id);
      }, (err) => {
        console.log(err);

      });

  }

  doDeletePrompt(friendid){
    const confirm = this.alertCtrl.create({
      title: 'Delete this Friend Request?',
      message: 'This friend may be important!',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(friendid);
          }
        },
        {
          text: 'No',
          handler: () => {
            // Close prompt
          }
        }
      ]
    });
    confirm.present();
  }

  private deleteItem(friendid){
    var id = friendid;
    this.http.delete(`http://localhost:8080/friendsrequest/delete_friend_request/${id}`).subscribe(res => {
      this.getFriendRequest();
    });
  }


}
