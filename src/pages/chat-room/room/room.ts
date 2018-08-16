import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { ChatRoomPage } from '../chat-room/chat-room';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import * as firebase from 'firebase';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  rooms = [];
  ref = firebase.database().ref('chatrooms/');
  user:any;
  resRooms:any;
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public modalCtrl: ModalController) {
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
      console.log(this.event._id);
      this.getRooms();
    });
  }

  getRooms(){
    this.http.get(`http://localhost:8080/chatrooms/get_chatroom/${this.event._id}`).subscribe(res => {
      this.resRooms = res;
      console.log(this.resRooms);
      this.ref.on('value', resp => {
        var res = snapshotToArray(resp);
        for(let i = 0; i < res.length; i++){
          for(let j = 0; j < this.resRooms.length; j++){
            if(res[i].key == this.resRooms[j].chatid){
              this.rooms.push(res[i]);
            }
          }
        }
        this.storage.get('userid').then((data) => {
          this.getUser(data);
        });
      });
    }, (err) => {
      console.log("error" + err);
    });
  }

  getUser(data) {
    this.http.get(`http://localhost:8080/users/get_user/${data}`).subscribe(res => {
      this.user = res;
    }, (err) => {
      console.log("error" + err);
    });
  }

  addRoom() {
    let modal = this.modalCtrl.create(AddRoomPage);
    modal.present();
  }

  joinRoom(key) {
    this.navCtrl.setRoot(ChatRoomPage, {
      key:key,
      nickname:this.user.username
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
