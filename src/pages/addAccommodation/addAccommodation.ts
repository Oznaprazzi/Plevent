import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-addAccommodation',
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
  error_message = '';

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController, public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addAccommo(){
    this.http.post('http://localhost:8080/accommo/addAccommo', {
      title: this.title,
      street: this.street,
      state: this.state,
      city: this.city,
      country:  this.country,
      fromDate: this.fromDate,
      toDate: this.toDate,
      price: this.price,
      guests: this.guests
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        let alert = this.alertCtrl.create({
          title: 'Low battery',
          subTitle: '10% of battery remaining',
          buttons: ['Dismiss']
        });
        alert.present();
        console.log(res);
        /*this.error_message = '';
        this.navCtrl.push(HomePage, {});*/


      }, (err) => {
        this.error_message = "Please fill in all the fields";
      });
  }

  getAccommo(){
    this.http.get('http://localhost:8080/accommo/getAccommo')
      .subscribe(res => {
        //this.accomodations = res;
        console.log(res);
      }, (err) => {
        this.error_message = "Please fill in all the fields";
      });
  }
}
