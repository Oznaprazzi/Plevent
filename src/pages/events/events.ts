import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import{HomePage} from '../home/home';
import {CreateEventPage} from "../createEvents/createevent";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventPage {

  userid: number = -1;
  events: any

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public storage: Storage) {


    storage.get('userid').then((data) => {
      this.userid = data;
      this.getUser();
      this.getAllEvents();
    });
  }

  addEvent() {
    this.navCtrl.push(CreateEventPage, {});
  }

  signout() {
    this.storage.set('loggedIn', false);

    this.navCtrl.push(HomePage, {});
  }

  getAllEvents() {

    this.http.get(`http://localhost:8080/events/event/${this.userid}`).subscribe(res => {
      this.events = res as Array<Object>;
      console.log(this.events);
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

  editEvent() {

  }
}
