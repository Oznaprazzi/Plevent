import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

import {AddTransportModalPage} from "./add-transport-modal";
import {EditTransportModalPage} from "./edit-transport-modal";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-transports',
  templateUrl: 'transports.html'
})
export class TransportsPage {
  transports:any;
  eventid :any;

  constructor(public navCtrl: NavController, public http: HttpClient, public modalCtrl: ModalController, public alertCtrl: AlertController, public storage: Storage) {
    storage.get('tappedEventObject').then((data) => {
      this.eventid = data;
      this.updateList();
    });
  }

  updateList(){
    this.http.get(`http://localhost:8080/transports/get_trans/${this.eventid._id}`).subscribe(res => {
      this.transports = res;
    });
  }

  editModal(trans) {
    let modal = this.modalCtrl.create(EditTransportModalPage, {"trans": trans});
    modal.onDidDismiss(() => {
      this.updateList();
    });
    modal.present();
  }

  addTrans(){
    let modal = this.modalCtrl.create(AddTransportModalPage);
    modal.onDidDismiss(() => {
      this.updateList();
    });
    modal.present();
  }

  deleteTrans(trans){
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this transport?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.http.delete(`http://localhost:8080/transports/delete_trans/${trans._id}`).subscribe(res => {
              this.updateList();
            });
          }
        }
      ]
    });
    alert.present();
  }
}
