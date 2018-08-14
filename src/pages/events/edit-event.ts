import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {

  error_message = '';
  users: any;
  username: string = "";
  userid: any;
  eventObject:any;
  usersList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,  public storage: Storage, public viewCtrl: ViewController) {
    storage.get('userObject').then((data)=> {
      this.username = data.username;
      this.userid = data._id;
      this.updateUsers();
    });
    this.eventObject = this.navParams.get('eventObject');
    for(let i = 0; i < this.eventObject.users.length; i++) {
      this.usersList.push(this.eventObject.users[i]._id);
    }
    console.log(this.eventObject);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  editEvent() {
    this.http.post(`http://localhost:8080/events/edit_event/${this.eventObject._id}`, {
        eventName: this.eventObject.eventName,
        eventDate: this.eventObject.eventDate,
        users: this.usersList
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        this.error_message = '';
        this.dismiss();
      }, (err) => {
        this.error_message = "Try again ";

      });
  }

  updateUsers(){
    this.http.get(`http://localhost:8080/users`).subscribe(res => {
      this.users  = res as Array<Object>
    }, (err) => {
      console.log("error"+ err);
    });
  }

}
