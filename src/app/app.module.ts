import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventPage } from '../pages/events/events';
import { AvalibilityplannerPage } from '../pages/avalibilityplanner/avalibilityplanner';
import { AccommodationsPage } from "../pages/accommodations/accommodations"
import { AddAccommodationPage } from "../pages/addAccommodation/addAccommodation"
import { SignupPage } from '../pages/signup/signup';
import { GroceriesPage } from '../pages/groceries/groceries';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import {CreateEventPage} from "../pages/createEvents/createevent";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventPage,
    AvalibilityplannerPage,
    AddAccommodationPage,
    AccommodationsPage,
    SignupPage,
    GroceriesPage,
    CreateEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventPage,
    AvalibilityplannerPage,
    AddAccommodationPage,
    AccommodationsPage,
    SignupPage,
    GroceriesPage,
    CreateEventPage
  ],
  providers: [
    StatusBar,
    HomePage,
    SplashScreen,
    DatePipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
