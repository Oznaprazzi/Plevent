import {AlertController, NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

import { Component } from '@angular/core';
import { AddAccommodationPage } from "./addAccommodation";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-accommodationPlanner',
  templateUrl: 'accommodations.html'
})

export class AccommodationsPage {
  accommodations:any;
  eventid :any;

  constructor(public navCtrl: NavController, public http: HttpClient, public modalCtrl: ModalController, public alertCtrl: AlertController, public storage: Storage) {
    storage.get('tappedEventObject').then((data) => {
      this.eventid = data;
      this.updateList();
    });
  }

  updateList(){
    this.http.get(`http://localhost:8080/accommo/get_accommo/${this.eventid._id}`).subscribe(res => {
      this.accommodations = res;
    });
  }

  editModal(accommo) {
    let modal = this.modalCtrl.create(ModalAccommodationPage, {"accommo": accommo});
    modal.onDidDismiss(() => {
      this.updateList();
    });
    modal.present();
  }

  addAccomo(){
    let modal = this.modalCtrl.create(AddAccommodationPage);
    modal.onDidDismiss(() => {
      this.updateList();
    });
    modal.present();
  }

  deleteAccommo(accommo){
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this accommodation?',
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
            this.http.delete(`http://localhost:8080/accommo/delete_accommo/${accommo._id}`).subscribe(res => {
              this.updateList();
            });
          }
        }
      ]
    });
    alert.present();
  }
}

@Component({
  selector: 'page-accommodationPlanner',
  templateUrl: 'editAccommodation.html'
})
export class ModalAccommodationPage {
  accommo: any;
  error_message = '';

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public http: HttpClient, public alertCtrl: AlertController) {
    this.accommo = params.get('accommo');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateAccommo(){
    this.http.post(`http://localhost:8080/accommo/edit_accommo/${this.accommo._id}`, {
        title: this.accommo.title,
        street: this.accommo.street,
        state: this.accommo.state,
        city: this.accommo.city,
        country:  this.accommo.country,
        fromDate: this.accommo.fromDate,
        toDate: this.accommo.toDate,
        price: this.accommo.price,
        guests: this.accommo.guests
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        this.error_message = '';
        let alert = this.alertCtrl.create({
          title: 'Successfully updated accommodation details',
          buttons: ['Ok']
        });
        alert.present();
        this.dismiss();
      }, (err) => {
        this.error_message = "Try again";

      });
  }
}
