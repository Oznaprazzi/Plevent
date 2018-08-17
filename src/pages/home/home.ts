import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

import{ EventPage } from '../events/events';
import{ SignupPage } from '../signup/signup';

import { Storage } from '@ionic/storage';

import { Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  error_message = '';
  username = '';
  password = '';
  userid: number = -1;
  showPass = false;
  type = 'password';
  eye_icon = "eye";
  //show_error_message= false;
  constructor(public navCtrl: NavController, public http: HttpClient, private storage: Storage, public events: Events) {
    // Or to get a key/value pair
  }

  login() {
    this.http.post('http://localhost:8080/login', {
        username : this.username.trim().toLowerCase(),
        password: this.password
      },
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .subscribe((res : {valid, user}) => {
        if (!res.valid){
          this.error_message = "Username or password incorrect";
        }else{
          this.error_message = '';
          this.username = '';
          this.password = '';
          this.storage.set('userid', res.user._id);
          this.storage.set('loggedIn', true);
          this.events.publish('eventsPage:outside');
          this.navCtrl.setRoot(EventPage,{
              userid: res.user._id
          });
          //this.global.userid = res.user._id;
          console.log(this.userid);

        }

      }, (err) => {
        this.error_message = "Username not found. Please sign up.";
      });
    this.storage.set('loggedIn', false);
  }

  register(){
    this.navCtrl.push(SignupPage);
  }

  showPassword() {
    this.showPass = !this.showPass;

    if(this.showPass){
      this.eye_icon = "eye-off";
      this.type = 'text';
    } else {
      this.eye_icon = "eye";
      this.type = 'password';
    }
  }
}
