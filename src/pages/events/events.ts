import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import{ HomePage } from '../home/home';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param


    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EventPage, {
      item: item
    });
  }
  addEvent(){

  }

  signout(){
    this.storage.set('loggedIn', false);

    this.navCtrl.push(HomePage,{

    });
  }
}
