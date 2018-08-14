import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-accommodationPlanner',
  templateUrl: 'addAccommodation.html'
})
export class AddAccommodationPage {
  title: string;
  street: string;
  state: string;
  city: string;
  country:  string;
  fromDate: any;
  toDate: any;
  price: number;
  guests: number;
  event : any;
  error_message = '';
  fromDateMin :string = new Date().toISOString();

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController, public viewCtrl: ViewController, public storage: Storage) {
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
    });
  }

  getMinDate(){
    if(this.fromDate == undefined){
      return this.fromDateMin;
    }
    return this.fromDate;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addAccommo(){
    this.http.post('http://localhost:8080/accommo/add_accommo', {
      title: this.title,
      street: this.street,
      state: this.state,
      city: this.city,
      country:  this.country,
      fromDate: this.fromDate,
      toDate: this.toDate,
      price: this.price,
      guests: this.guests,
      event: this.event._id
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        let alert = this.alertCtrl.create({
          title: 'Successfully added new accommodation',
          buttons: ['Ok']
        });
        alert.present();
        this.dismiss();

      }, (err) => {
        this.error_message = "Please fill in all the fields";
      });
  }
}
