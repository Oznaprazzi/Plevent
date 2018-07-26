import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { AvalibilityplannerPage } from '../avalibilityplanner/avalibilityplanner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = "";
  password = "";

  constructor(public navCtrl: NavController, public http: HttpClient) {

    /*this.navCtrl.push(AvalibilityplannerPage, {
      username: this.username
    });*/
  }

  login() {
    console.log("logging in");
    this.http.post('http://localhost:8080/login', {
        username : this.username,
        password: this.password
      },
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .subscribe(res => {
        console.log("RES");
        console.log(res);

      }, (err) => {
        console.log("Error");
        console.log(err);
      });

  }
}
