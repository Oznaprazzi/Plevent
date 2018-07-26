import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

import{ ListPage } from '../list/list';
import{ SignupPage } from '../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = "";
  password = "";
  error_message = '';
  //show_error_message= false;
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
      .subscribe(res => {
        if (!res){
          this.error_message = "Username or password incorrect";
        }else{
          this.error_message = '';
          this.navCtrl.push(ListPage,{

          });
        }

      }, (err) => {
        this.error_message = "Username not found. Please sign up.";
      });

  }

  register(){
    this.navCtrl.push(SignupPage);
  }
}
