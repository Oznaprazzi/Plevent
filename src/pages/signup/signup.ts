import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  username = "";
  password = "";
  fname= "";
  lname="";
  bdate="";
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
        if (res == false){
          this.error_message = "ur fuked cunt!";
          this.show_error_message= true;
        }

      }, (err) => {
        this.error_message = "ur fuked cunt........";
        this.show_error_message= true;
      });

  }
}
