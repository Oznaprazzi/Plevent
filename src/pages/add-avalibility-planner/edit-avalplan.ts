/**
 * Created by Dipen on 13/08/2018.
 */
import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'page-edit-avalplan',
  templateUrl: 'edit-avalplan.html',
})
export class EditAvalPage {

  error_message = '';
  toDate: Date;
  fromDate: Date;
  eventObject: any;
  avalObject: any;
  user: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage: Storage, public viewCtrl: ViewController) {
    this.user = this.navParams.get('userObject');
    this.avalObject = this.navParams.get('avalPlanObject');
    this.eventObject = this.navParams.get('eventObject');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  editAvalPlan() {
    var fullname = this.user.fname + " " + this.user.lname;
    this.http.post(`http://localhost:8080/availability/edit_avalplan/${this.avalObject._id}`, {
        startDate: this.fromDate,
        endDate: this.toDate,
        event: this.eventObject._id,
        name: fullname,
        user: this.user._id
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
