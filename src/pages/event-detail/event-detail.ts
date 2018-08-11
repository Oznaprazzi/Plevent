import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {UtilityService} from "../../app/UtilityService";

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event:any;
  accommodations:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public util: UtilityService) {
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
      this.accommodations = this.util.updateAccommodations();
    });
  }

}
