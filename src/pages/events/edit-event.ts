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
  users: any =[];
  username: string = "";
  userid: any;
  eventObject:any;
  usersList = [];
  userObject: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient,  public storage: Storage, public viewCtrl: ViewController) {
    storage.get('userObject').then((data)=> {
      this.username = data.username;
      this.userid = data._id;
      this.userObject = data;
      this.updateUsers();
    });
    storage.get('tappedEventObject').then((data) => {
      this.eventObject = data;
      for(let i = 0; i < this.eventObject.users.length; i++) {
        this.usersList.push(this.eventObject.users[i]._id);
      }
    });
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
        this.http.get(`http://localhost:8080/events/get_event/${this.eventObject._id}`).subscribe(event =>{
          this.storage.set('tappedEventObject', event);
          console.log(event);
        });
        this.dismiss();
      }, (err) => {
        this.error_message = "Try again ";

      });
  }

  updateUsers(){
    this.http.get(`http://localhost:8080/friendslist/get_all_friend/${this.userid}`).subscribe(res => {
      for(let i in res){
        this.users.push(res[i].friends);
      }
      this.users.push(this.userObject);
    }, (err) => {
      console.log("error"+ err);
    });
  }

}
