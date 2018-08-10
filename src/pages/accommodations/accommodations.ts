import {AlertController, NavController} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common'

import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { AddAccommodationPage } from "./addAccommodation";
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'page-accommodationPlanner',
  templateUrl: 'accommodations.html'
})
export class AccommodationsPage {
  accommodations:any;
  constructor(public navCtrl: NavController, public http: HttpClient, public datepipe: DatePipe, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.updateList();
  }

  updateList(){
    this.http.get('http://localhost:8080/accommo/get_accommo')
      .subscribe(res => {
        this.accommodations = res;
      });
  }

  openModal(accommo) {
    let modal = this.modalCtrl.create(ModalAccommodationPage, {"accommo": accommo});
    modal.present();
    modal.onDidDismiss(() => {
      this.updateList();
    });
  }

  addAccomo(){
    let modal = this.modalCtrl.create(AddAccommodationPage);
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

  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }
}

@Component({
  selector: 'page-accommodationPlanner',
  templateUrl: 'editAccommodation.html'
})
export class ModalAccommodationPage {
  accommo: any;
  error_message = '';

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public http: HttpClient) {
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
        this.dismiss();
      }, (err) => {
        this.error_message = "Try again ";

      });
  }
}
