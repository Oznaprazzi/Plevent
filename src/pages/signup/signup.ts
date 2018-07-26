import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

import{ HomePage } from '../home/home';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  username: string;
  password: string;
  fname: string;
  lname: string;
  bdate: any;
  error_message= "";
  show_error_message= false;
  constructor(public navCtrl: NavController, public http: HttpClient) {
  }

  signup() {
    this.http.post('http://localhost:8080/register', {
        username : this.username,
        password: this.password,
        fname: this.fname,
        lname: this.lname,
        bdate: this.bdate
      },
      {
        headers: { 'Content-Type': 'application/json' }
      })
      .subscribe(res => {

        this.error_message = '';
        this.navCtrl.push(HomePage,{
        });


      }, (err) => {
        this.error_message = "Please fill in all the fields";
        this.show_error_message= true;
      });

  }
}
