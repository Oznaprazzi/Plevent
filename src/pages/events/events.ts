import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import{EditEventPage} from '../edit-event/edit-event';
import{EventDetailPage} from '../event-detail/event-detail';
import {CreateEventPage} from "../createEvents/createevent";
import {HttpClient} from "@angular/common/http";
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventPage {

  userid: number = -1;
  eventsList: any;

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public storage: Storage, public events: Events) {
    storage.get('userid').then((data) => {
      this.userid = data;
      this.getUser();
      this.getAllEvents();
    });
  }

  addEvent() {
    this.navCtrl.push(CreateEventPage, {});
  }

  getAllEvents() {

    this.http.get(`http://localhost:8080/events/event/${this.userid}`).subscribe(res => {
      this.eventsList = res as Array<Object>;
      console.log(this.eventsList);
    }, (err) => {
      console.log("error" + err);
    });
  }

  getUser() {
    this.http.get(`http://localhost:8080/users/get_user/${this.userid}`).subscribe(res => {
      this.storage.set('userObject', res);
    }, (err) => {
      console.log("error" + err);
    });
  }

  deleteEvent(eventID ) {
    var id = eventID;
    console.log(id);
    this.http.delete(`http://localhost:8080/events/delete_event/${id}`).subscribe(res => {
      console.log(res);
      this.getAllEvents();
    });
  }

  editEvent(eventObject) {
    console.log("edit event");

    this.navCtrl.push(EditEventPage,{
      eventObject:eventObject

    });
  }
  tapped(eventObject){
    console.log("tapped event");
    this.events.publish('eventsPage:inside');
    this.navCtrl.push(EventDetailPage,{
      eventObject: eventObject
    });
  }

}
