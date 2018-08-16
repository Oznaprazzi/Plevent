import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import {snapshotToArray} from "../room/room";
import { HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

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
  rooms: any;
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage: Storage, public alertCtrl: AlertController, public viewCtrl: ViewController) {
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

    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.addtodb(this.rooms[this.rooms.length - 1].key);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
  }

  addtodb(chatid){
    this.http.post('http://localhost:8080/chatrooms/add_chatroom', {
        event: this.event._id,
        chatid: chatid
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        let alert = this.alertCtrl.create({
          title: 'Successfully created new chat',
          buttons: ['Ok']
        });
        alert.present();
        this.dismiss();
      }, (err) => {
        //this.error_message = "Please fill in all the fields";
      });
  }

}
