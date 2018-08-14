import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { AvalibilityplannerPage } from '../pages/avalibilityplanner/avalibilityplanner';
import { GroceriesPage } from '../pages/groceries/groceries';
import { GearsPage } from '../pages/gears/gears';
import { EventPage } from '../pages/events/events';
import { AccommodationsPage } from "../pages/accommodations/accommodations";

import { Events } from 'ionic-angular';
import { EventDetailPage } from "../pages/event-detail/event-detail";
import { ExpenseDashboardPage } from '../pages/expense-dashboard/expense-dashboard';
import { ChatbotPage } from '../pages/chatbot/chatbot';
import { WaypointPlannerPage } from '../pages/waypoint-planner/waypoint-planner';
import { UserDetailsPage } from "../pages/user-details/user-details";
import { WaypointListPage } from '../pages/waypoint-list/waypoint-list';

@Component({
  templateUrl: 'app.html'
})
export class Plevent {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events, public storage: Storage) {
    this.initializeApp();
    this.storage.get('loggedIn').then((val) => {
      if(val){
        this.events.publish('eventsPage:outside');
        this.storage.set('isInsideDets', false);
        this.nav.setRoot(WaypointListPage);
      }else{
        this.nav.setRoot(HomePage);
      }
    });

    this.events.subscribe('eventsPage:outside',()=>{
      this.pages = [
        {title: 'Home', component: EventPage},
        { title: 'Ask Plive', component: ChatbotPage },
        {title: 'My Account', component: UserDetailsPage},
        {title: 'Logout', component: HomePage}
      ];
    });

    this.events.subscribe('eventsPage:inside',()=>{
      this.pages = [
        { title: 'Home', component: EventPage },
        { title: 'Event Details', component: EventDetailPage },
        { title: 'Accommodation Planner', component: AccommodationsPage },
        { title: 'Availability Planner', component: AvalibilityplannerPage },
        { title: 'Waypoint Planner', component: WaypointPlannerPage },
        { title: 'Groceries', component: GroceriesPage },
        { title: 'Gears', component: GearsPage },
        { title: 'Expenses', component: ExpenseDashboardPage },
        { title: 'Ask Plive', component: ChatbotPage },
        {title: 'My Account', component: UserDetailsPage},
        {title: 'Logout', component: HomePage}
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

    if(page.title == 'Event Details') {
      this.storage.set('isInsideDets', true);
    }

    if(page.title == 'Logout'){
      this.storage.set('loggedIn', false);
      this.storage.set('isInsideDets', false);
    }else if(page.title == 'Home'){
      this.storage.set('isInsideDets', false);
    }

    this.storage.ready().then(() => {
      this.storage.get('isInsideDets').then((data) => {
        if(data){
          this.events.publish('eventsPage:inside');
        }else{
          this.events.publish('eventsPage:outside');
        }
      });

      this.nav.setRoot(page.component);
    });
  }
}
