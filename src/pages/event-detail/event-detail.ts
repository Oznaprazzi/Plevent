import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {AccommodationsPage} from "../accommodations/accommodations";
import {ExpenseDashboardPage} from "../expense-dashboard/expense-dashboard";

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event:any;
  accommoL = 0;
  totalExpenses = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient) {
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
      this.getAccommo();
      this.getEvents();
    });
  }

  getAccommo(){
    this.http.get('http://localhost:8080/accommo/get_accommo').subscribe(res => {
      var accommodations:any = res;
      accommoL = accommodations.length;
    });
  }

  getEvents(){
    this.http.get('http://localhost:8080/expenses').subscribe(res => {
      var expenses:any = res;
      for(var item of expenses){
        this.totalExpenses += item.amount;
      }
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
    //this.navCtrl.setRoot(ExpenseDashboardPage);
  }
}
