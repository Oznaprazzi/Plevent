import {Component} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import{EditEventPage} from './edit-event';
import{EventDetailPage} from '../event-detail/event-detail';
import {CreateEventPage} from "../createEvents/createevent";
import {HttpClient} from "@angular/common/http";
import {Events} from 'ionic-angular';
import {UtilityService} from "../../app/UtilityService";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventPage {

  userid: number = -1;
  eventsList: any;
  showPage = false;

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams,
              public storage: Storage, public events: Events, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public util: UtilityService) {
    var loading = this.util.presentLoadingDots();
    loading.present();
    storage.get('userid').then((data) => {
      this.userid = data;
      this.loadQueries();
      loading.dismissAll();
    });
    loading.onDidDismiss(()=>{
      this.showPage = true;
    });
  }

  async loadQueries(){
    await this.getUser();
    await this.getAllEvents();
  }

  addEvent() {
    this.navCtrl.push(CreateEventPage, {});
  }

  getAllEvents() {
    this.http.get(`http://localhost:8080/events/event/${this.userid}`).subscribe(res => {
      this.eventsList = res as Array<Object>;
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

  deleteEvent(eventID) {

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this event?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.http.delete(`http://localhost:8080/events/delete_event/${eventID}`).subscribe(res => {
              this.getAllEvents();
            });
          }
        }
      ]

    });
    alert.present();
  }


  openModal(eventObject) {
    this.storage.set('tappedEventObject', eventObject);
    let modal = this.modalCtrl.create(EditEventPage);
    modal.present();
    modal.onDidDismiss(() => {
      this.getAllEvents();
    });
  }

  tapped(eventObject){
    this.storage.set('tappedEventObject', eventObject);
    this.storage.set('isInsideDets', true);
    this.events.publish('eventsPage:inside');
    this.navCtrl.setRoot(EventDetailPage);
  }

}
