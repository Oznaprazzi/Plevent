import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { AddAccommodationPage } from "../addAccommodation/addAccommodation"
import { DatePipe } from '@angular/common'

import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-accommodationPlanner',
  templateUrl: 'accommodations.html'
})
export class AccommodationsPage {
  accommodations:any;
  constructor(public navCtrl: NavController, public http: HttpClient, public datepipe: DatePipe, public modalCtrl: ModalController) {

    this.http.get('http://localhost:8080/accommo/getAccommo')
      .subscribe(res => {
      this.accommodations = res;
    }, (err) => {
      //this.error_message = "Please fill in all the fields";
    });
  }

  openModal() {

    let modal = this.modalCtrl.create(ModalContentPage, {"accommo": accommo});
    modal.present();
  }

  addAccomo(){
    this.navCtrl.push(AddAccommodationPage,{

    });
  }
}

@Component({
  templateURL: 'editAccommodation.html'
})
export class ModalContentPage {
  accommo: any;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
    accommo = params.get('accommo');
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
