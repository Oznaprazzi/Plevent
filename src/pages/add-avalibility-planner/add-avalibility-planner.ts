import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-add-avalibility-planner',
  templateUrl: 'add-avalibility-planner.html',
})
export class AddAvalibilityPlannerPage {
  avalPlanner: any;
  eventObject: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public storage: Storage) {
    storage.get('tappedEventObject').then((data) => {
      this.eventObject = data;
    });
  }


  openModal(eventObject) {
  console.log(eventObject);
    let modal = this.modalCtrl.create(ModalSelectDatePage, {"eventObject": eventObject});
    modal.present();
  }


}


@Component({
  templateUrl: 'selectDateModal.html'
})
export class ModalSelectDatePage {

  error_message = '';
  toDate: Date;
  fromDate: Date;
  eventObject: any;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public http: HttpClient, public storage: Storage) {
    this.eventObject = params.get('eventObject');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setDates() {
    console.log("In Modal Evenet Object " + this.eventObject.eventName);
    this.http.post('http://localhost:8080/availability/create_planner', {
        startDate: this.toDate,
        endDate: this.fromDate,
        event: this.eventObject
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        this.dismiss();
      }, (err) => {
        this.error_message = "Try again ";

      });
  }
}
