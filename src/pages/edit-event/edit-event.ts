import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';

import{EventPage} from '../events/events';

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {

  eventname = "";
  eventdate = "";
  error_message = '';
  users: any;
  username: string = "";
  userid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,  public storage: Storage) {
    storage.get('userObject').then((data)=> {
      this.username = data.username;
      this.userid = data._id;
      this.updateUsers();
    });
  }

  editEvent() {
    var id =this.navParams.get('id');
    console.log(id);
    this.http.post(`http://localhost:8080/events/edit_event/${id}`, {
        eventName: this.eventname,
        eventDate: this.eventdate,
        users: this.userid
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

  updateUsers(){
    this.http.get(`http://localhost:8080/users`).subscribe(res => {
      this.users  = res as Array<Object>;
    }, (err) => {
      console.log("error"+ err);
    });
  }

}
