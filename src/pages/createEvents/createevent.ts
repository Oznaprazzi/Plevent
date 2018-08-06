import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';


import {Storage} from '@ionic/storage';
import {EventPage} from "../events/events";
import { Global } from "../../services/global";

@Component({
  selector: 'page-createevent',
  templateUrl: 'createevent.html'
})
export class CreateEventPage {
  eventname = "";
  eventdate = "";
  error_message = '';
  toppings: Array<string>;
  //show_error_message= false;
  userid: number = -1;
  constructor(public navCtrl: NavController, public http: HttpClient, public storage: Storage,public navParams: NavParams, public gobal: Global) {
    this.toppings = ['bacon', 'xcheese'];
    // this.storage.get('userid').then((data)=> {
    //   this.userid = data;
    // });
    //
    this.userid = navParams.get('userid');
    console.log(this.userid);
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
