import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {AccommodationsPage} from "../accommodations/accommodations";
import {ExpenseDashboardPage} from "../expense-dashboard/expense-dashboard";
import {EditEventPage} from "../events/edit-event";
import {TransportsPage} from "../transports/transports";

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event:any;
  accommodations:any;
  expenses:any;
  accommoL = 0;
  totalExpenses = 0;
  transportsL = 0;
  transports: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.storage.get('tappedEventObject').then((data) => {
      this.event = data;
      this.getAccommo();
      this.getExpenses();
      this.getTrans();
    });
  }

  getAccommo(){
    this.http.get(`http://localhost:8080/accommo/get_accommo/${this.event._id}`).subscribe(res => {
      this.accommodations = res;
      this.accommoL = this.accommodations.length;
    });
  }

  getTrans(){
    this.http.get(`http://localhost:8080/transports/get_trans/${this.event._id}`).subscribe(res => {
      this.transports = res;
      this.transportsL = this.transports.length;
    });
  }

  getExpenses(){
    this.http.get(`http://localhost:8080/expenses/${this.event._id}`).subscribe(res => {
      this.expenses = res;
      for(var item of this.expenses){
        this.totalExpenses += item.amount;
      }
    });
  }

  editEvent(eventObject){
    let modal = this.modalCtrl.create(EditEventPage, {"eventObject": eventObject});
    modal.present();
    modal.onDidDismiss(() => {
      //this.getAllEvents();
    });
  }

  toAccommoPage(){
    this.navCtrl.setRoot(AccommodationsPage);
  }

  toExpensePage(){
    this.navCtrl.setRoot(ExpenseDashboardPage);
  }

  toWayPointsPage(){
    //this.navCtrl.setRoot(ExpenseDashboardPage);
  }

  toTransportPage(){
    this.navCtrl.setRoot(TransportsPage);
  }

  /*getAllEvents() {
    this.http.get(`http://localhost:8080/events/event/${this.userid}`).subscribe(res => {
      this.eventsList = res as Array<Object>;
    }, (err) => {
      console.log("error" + err);
    });
  }*/
}
