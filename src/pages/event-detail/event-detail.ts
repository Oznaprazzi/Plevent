import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {AccommodationsPage} from "../accommodations/accommodations";
import {ExpenseDashboardPage} from "../expense-dashboard/expense-dashboard";
import {EditEventPage} from "../events/edit-event";
import {TransportsPage} from "../transports/transports";
import {UtilityService} from "../../app/UtilityService";
import {WaypointListPage} from "../waypoint-list/waypoint-list";

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
  wayPoints: any;
  wayPointsL = 0;
  showPage = false;
  usersLength: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
              public http: HttpClient, public modalCtrl: ModalController, public alertCtrl: AlertController, public util: UtilityService) {
    var loading = this.util.presentLoadingDots();
    loading.present();
    this.storage.get('tappedEventObject').then((data) => {
      this.event = data;

      if(this.event.users.length == 1){
        this.usersLength = "Just you";
      }else{
        this.usersLength = this.event.users.length;
      }
      this.loadQueries();
      loading.dismissAll();
    });
    loading.onDidDismiss(()=>{
      this.showPage = true;
    });
  }

  async loadQueries(){
    await this.getAccommo();
    await this.getExpenses();
    await this.getTrans();
    await this.getWayPoints();
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

  getWayPoints(){
    this.http.get(`http://localhost:8080/waypoints/${this.event._id}`).subscribe(res => {
      this.wayPoints = res;
      this.wayPointsL = this.wayPoints.length;
    });
  }

  editEvent(eventObject){
    let modal = this.modalCtrl.create(EditEventPage, {"eventObject": eventObject});
    modal.present();
  }

  toAccommoPage(){
    this.navCtrl.setRoot(AccommodationsPage);
  }

  toExpensePage(){
    this.navCtrl.setRoot(ExpenseDashboardPage);
  }

  toWayPointsPage(){
    this.navCtrl.setRoot(WaypointListPage);
  }

  toTransportPage(){
    this.navCtrl.setRoot(TransportsPage);
  }
}
