import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {AlertController} from "ionic-angular/components/alert/alert-controller";

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  friendList: any;
  userObject: any;

  constructor(public alertCtrl: AlertController, public http: HttpClient, public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
    this.storage.get('userObject').then((data) => {
      this.userObject = data;
      // this.retriveMyFriends();
    });
  }

  ionViewWillEnter(){
    this.retriveMyFriends();
  }

  retriveMyFriends() {
    this.http.get(`http://localhost:8080/friendslist/get_all_friend/${this.userObject._id}`).subscribe(res => {
      this.friendList = res as Array<Object>;
    }, (err) => {
      console.log("error" + err);
    });
  }

  doDeletePrompt(removeFriend){
    const confirm = this.alertCtrl.create({
      title: 'Delete Friend?',
      message: 'This friend may be important!',
      buttons: [

        {
          text: 'No',
          handler: () => {
            // Close prompt
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(removeFriend);
          }
        }
      ]
    });
    confirm.present();
  }

  private deleteItem(removeFriend){
    var id = removeFriend._id;
    var rmUser = removeFriend.user._id;
    var rmFriends  = removeFriend.friends._id;

    this.http.delete(`http://localhost:8080/friendslist/unfriend/${id}/${rmUser}/${rmFriends}`).subscribe(res => {
      this.retriveMyFriends();
    });

  }

}
