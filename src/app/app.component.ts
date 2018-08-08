import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { AvalibilityplannerPage } from '../pages/avalibilityplanner/avalibilityplanner';
import { GroceriesPage } from '../pages/groceries/groceries';
import { EventPage } from '../pages/events/events';
import { AccommodationsPage } from "../pages/accommodations/accommodations"

import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, events: Events, public storage: Storage) {
    this.initializeApp();

    events.subscribe('eventsPage:outside',()=>{
      this.pages = [
        {title:'Events', component: EventPage},
        //{title:'My Account', component: MyAccountPage},
        {title:'Logout', component: HomePage}
      ];
    });

    events.subscribe('eventsPage:inside',()=>{
      this.pages = [
        { title: 'Events', component: EventPage },
        { title: 'Accommodation Planner', component: AccommodationsPage },
        { title: 'Availability Planner', component: AvalibilityplannerPage },
        { title: 'Groceries', component: GroceriesPage }
      ];
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    if(page.title == 'Logout'){
      this.storage.set('loggedIn', false);
    }
  }
}
