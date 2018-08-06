import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  addAccommo(){
    this.http.post('http://localhost:8080/accommodation', {
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
        console.log(res);
        /*this.error_message = '';
        this.navCtrl.push(HomePage, {});*/


      }, (err) => {
        this.error_message = "Please fill in all the fields";
      });
  }
}
