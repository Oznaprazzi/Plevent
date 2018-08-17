import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';


import {Storage} from '@ionic/storage';
import {EventPage} from "../events/events";

@Component({
  selector: 'page-createevent',
  templateUrl: 'createevent.html'
})
export class CreateEventPage {
  eventname = "";
  eventdate = "";
  error_message = '';
  users: any = [];
  username: string = "";
  userid: any;
  userObject: any;

  constructor(public navCtrl: NavController, public http: HttpClient, public storage: Storage) {
    storage.get('userObject').then((data)=> {
      this.username = data.username;
      this.userid = data._id;
      this.userObject = data;
      this.updateUsers();
    });
  }

  createEvent() {

    this.http.post('http://localhost:8080/events/add_event', {
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
