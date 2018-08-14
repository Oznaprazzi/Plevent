import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tranports',
  templateUrl: 'add-transport-modal.html'
})
export class AddTransportModalPage {
  title: string;
  owner: any;
  fuel: string;
  people: number;
  event : any;
  users: any;
  fueltypes:any;
  usersList = [];
  error_message = '';

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController, public viewCtrl: ViewController, public storage: Storage) {
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
      this.getUsers();
      this.fueltypes = ["Diesel", "Petrol 91", "Petrol 95", "Petrol 98", "Gas", "Electric", "Hybrid", "Other"];
    });
  }

  getUsers(){
    this.http.get(`http://localhost:8080/users`).subscribe(res => {
      this.users  = res as Array<Object>;
    }, (err) => {
      console.log("error"+ err);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addTrans(){
    this.http.post('http://localhost:8080/transports/add_trans', {
      title: this.title,
      owner: this.usersList,
      people: this.people,
      fuel: this.fuel,
      event: this.event._id
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        let alert = this.alertCtrl.create({
          title: 'Successfully added new transportation',
          buttons: ['Ok']
        });
        alert.present();
        this.dismiss();

      }, (err) => {
        this.error_message = "Please fill in all the fields";
      });
  }
}
