import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = "";
  password = "";
  error_message= "";
  show_error_message= false;
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
        if (res == false){
          this.error_message = "Username or password incorrect";
          this.show_error_message= true;
        }

      }, (err) => {
        this.error_message = "Username not found please sign up";
        this.show_error_message= true;
      });

  }
}
