import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event:any;
  accommodations:any;
  expenses:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient) {
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
      this.updateAccommo();

      //this.expenses
    });
  }

  updateAccommo(){
    this.http.get('http://localhost:8080/accommo/get_accommo').subscribe(res => {
      this.accommodations = res;
      console.log(this.updateAccommo());
    });
  }
}
