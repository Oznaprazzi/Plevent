import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';


import {Storage} from '@ionic/storage';
import {EventPage} from "../events/events";


@Component({
  selector: 'page-createevent',
  templateUrl: 'createevent.html'
})
export class CreateEventPage {
  eventname = "";
  eventdate = "";
  error_message = '';
  userid = -1;
  //show_error_message= false;
  constructor(public navCtrl: NavController, public http: HttpClient, private storage: Storage, public navParams: NavParams) {
    this.storage.get('userid').then((data) => {
      this.userid = data;
    })
  }

  createEvent() {

    this.http.post('http://localhost:8080/events/add_event', {
        eventName: this.eventname,
        eventDate: this.eventdate,
        users: "5b5c05f2b9db8e34f046ffd5"

      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {

        this.error_message = '';
        this.navCtrl.push(EventPage, {});


      }, (err) => {
        this.error_message = "Try again ";

      });
  }
}
