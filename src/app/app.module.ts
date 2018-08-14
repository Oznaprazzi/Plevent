
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { Plevent } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventPage } from '../pages/events/events';
import { AvalibilityplannerPage } from '../pages/avalibilityplanner/avalibilityplanner';
import { AccommodationsPage, ModalAccommodationPage } from "../pages/accommodations/accommodations"
import { AddAccommodationPage } from "../pages/accommodations/addAccommodation"
import { SignupPage } from '../pages/signup/signup';
import { GroceriesPage } from '../pages/groceries/groceries';
import { GearsPage } from '../pages/gears/gears';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import {CreateEventPage} from "../pages/createEvents/createevent";
import {EditEventPage} from "../pages/events/edit-event";
import {EventDetailPage} from "../pages/event-detail/event-detail";
import { ExpenseListPage, ExpenseModalPage } from '../pages/expense-list/expense-list';
import { ExpenseDashboardPage } from '../pages/expense-dashboard/expense-dashboard';
import { ChatbotPage } from '../pages/chatbot/chatbot';
import {AmChartsModule} from "@amcharts/amcharts3-angular";
import {AddAvalibilityPlannerPage, ModalSelectDatePage} from "../pages/add-avalibility-planner/add-avalibility-planner";
import {EditAvalPage} from "../pages/add-avalibility-planner/edit-avalplan";
import {UserDetailsPage} from "../pages/user-details/user-details";
import {DatePipe} from "@angular/common";
import {UsernameModalPage} from "../pages/user-details/username-modal";
import {PasswordModalPage} from "../pages/user-details/password-modal";
import {EditTransportModalPage} from "../pages/transports/edit-transport-modal";
import {AddTransportModalPage} from "../pages/transports/add-transport-modal";
import {TransportsPage} from "../pages/transports/transports";


@NgModule({
  declarations: [
    Plevent,
    HomePage,
    UserDetailsPage,
    UsernameModalPage,
    PasswordModalPage,
    EventPage,
    AvalibilityplannerPage,
    EditAvalPage,
    AddAccommodationPage,
    AccommodationsPage,
    SignupPage,
    GroceriesPage,
    CreateEventPage,
    EditEventPage,
    EventDetailPage,
    GearsPage,
    ExpenseListPage,
    ExpenseModalPage,
    ModalAccommodationPage,
    GearsPage,
    AddAvalibilityPlannerPage,
    ModalSelectDatePage,
    ExpenseDashboardPage,
    ChatbotPage,
    TransportsPage,
    EditTransportModalPage,
    AddTransportModalPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Plevent,{
      backButtonIcon: "md-arrow-back",
      iconMode: "md",
      mode:'md'
    }),
    HttpClientModule,
    AmChartsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Plevent,
    HomePage,
    UserDetailsPage,
    UsernameModalPage,
    PasswordModalPage,
    EventPage,
    AvalibilityplannerPage,
    EditAvalPage,
    AddAccommodationPage,
    AccommodationsPage,
    SignupPage,
    GroceriesPage,
    CreateEventPage,
    EditEventPage,
    EventDetailPage,
    GearsPage,
    ExpenseListPage,
    ExpenseModalPage,
    ModalAccommodationPage,
    GearsPage,
    AddAvalibilityPlannerPage,
    ModalSelectDatePage,
    ExpenseDashboardPage,
    ChatbotPage,
    TransportsPage,
    EditTransportModalPage,
    AddTransportModalPage

  ],
  providers: [
    StatusBar,
    HomePage,
    SplashScreen,
    DatePipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
