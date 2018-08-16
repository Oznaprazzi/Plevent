import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
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
  firedbrooms=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
      console.log(this.event._id);
      this.getRooms();
    });
  }

  getRooms(){
    this.http.get(`http://localhost:8080/chatrooms/get_chatroom/${this.event._id}`).subscribe(res => {
      this.resRooms = res;
      this.ref.on('value', resp => {
        this.firedbrooms = snapshotToArray(resp);
        this.rooms = [];
        for(let i = 0; i < this.firedbrooms.length; i++){
          for(let j = 0; j < this.resRooms.length; j++){
            if(this.firedbrooms[i].key == this.resRooms[j].chatid){
              this.rooms.push(this.firedbrooms[i]);
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
    modal.onDidDismiss(() => {
      this.addtodb(this.firedbrooms[this.firedbrooms.length - 1].key);
    });
    modal.present();
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
        this.getRooms();
      }, (err) => {
        //this.error_message = "Please fill in all the fields";
      });
  }

  joinRoom(key, roomname) {
    this.navCtrl.push(ChatRoomPage, {
      key:key,
      nickname:this.user.username,
      roomname: roomname
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
