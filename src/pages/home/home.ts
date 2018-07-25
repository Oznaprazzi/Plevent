import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvalibilityplannerPage } from '../avalibilityplanner/avalibilityplanner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = "";
  password = "";

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  login() {
    this.http.post('http://localhost:8080/login', {
        username : this.username,
        password: this.password
      },
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(data => {

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);
        this.navCtrl.push(AvalibilityplannerPage, {
          username: this.username
        });
      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });

  }
}
