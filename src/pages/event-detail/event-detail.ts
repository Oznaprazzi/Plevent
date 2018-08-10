import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {UtilityService} from "../../app/utilityService";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public util: UtilityService, public storage: Storage) {
    //this.event = util.getEvent(storage);
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
      console.log(this.event);
    });
  }

}
