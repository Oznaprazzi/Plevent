import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';

/**
 * Generated class for the AddRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {
  roomname = '';
  ref = firebase.database().ref('chatrooms/');
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController) {
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addRoom() {
    let newData = this.ref.push();
    newData.set({
      roomname:this.roomname
    });
    this.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
  }

}
