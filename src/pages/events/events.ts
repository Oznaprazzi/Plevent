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
  // selectedItem: any;
  // icons: string[];
  // items: Array<{title: string, note: string, icon: string}>;
  userid:number = -1;

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, private storage: Storage) {

    this.getAllEvents();
    //this.userid = navParams.get('userid');
    this.storage.get('userid').then((data) => {
      this.userid = data;
    })
    // If we navigated to this page, we will have an item available as a nav param
    //
    //
    // // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];
    //
    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  // itemTapped(event, item) {
  //   // That's right, we're pushing to ourselves!
  //   this.navCtrl.push(EventPage, {
  //     item: item
  //   });
  // }
  addEvent() {
    this.navCtrl.push(CreateEventPage, {
      userid : this.userid
    });
  }

  signout() {
    this.storage.set('loggedIn', false);

    this.navCtrl.push(HomePage, {});
  }

  getAllEvents() {
    this.http.post('http://localhost:8080/get_events', {
        username: "dipen"
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        if (!res) {


        }

      }, (err) => {

      });
  }
}
