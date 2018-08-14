import { Component } from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-tranports',
  templateUrl: 'edit-transport-modal.html'
})
export class EditTransportModalPage {
  title: string;
  owner: any;
  fuel: string;
  people: number;
  users: any;
  fueltypes:any;
  trans: any;
  error_message = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.trans = navParams.get("trans");
    this.getUsers();
    this.fueltypes = ["Diesel", "Petrol 91", "Petrol 95", "Petrol 98", "Gas", "Electric", "Hybrid", "Other"];
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

  editTrans(){
    this.http.post(`http://localhost:8080/transports/edit_trans/${this.trans._id}`, {
        title: this.trans.title,
        owner: this.trans.owner._id,
        people: this.trans.people,
        fuel: this.trans.fuel,
        event: this.trans.event
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        let alert = this.alertCtrl.create({
          title: 'Successfully updated transportation details',
          buttons: ['Ok']
        });
        alert.present();
        this.dismiss();

      }, (err) => {
        this.error_message = "Please fill in all the fields";
      });
  }
}
