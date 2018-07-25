import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvalibilityplannerPage } from '../avalibilityplanner/avalibilityplanner';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username="";
  users = [];
  constructor(public navCtrl: NavController, public http: HTTP) {
    this.users = this.http.get("http://localhost:8080/login");
  }

  login() {

    this.navCtrl.push(AvalibilityplannerPage, {
      username: this.username
    });
  }
}
