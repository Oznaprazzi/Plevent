import { Component } from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-accommodationPlanner',
  templateUrl: 'addAccommodation.html'
})
export class PasswordModalPage {
  cPassword: any;
  password: any;
  rePassword: any;
  userid:any;
  user: any;
  error_message = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController, public viewCtrl: ViewController, public storage: Storage) {
    storage.get('userid').then((data) => {
      this.userid = data;
      this.getUser();
    });
  }

  getUser() {
    this.http.get(`http://localhost:8080/users/get_user/${this.userid}`).subscribe(res => {
      this.user = res;
    }, (err) => {
      console.log("error" + err);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  changePassword(){
      this.http.post('http://localhost:8080/login', {
          username : this.user.username,
          password: this.cPassword
        },
        {
          headers: { 'Content-Type': 'application/json' }
        })
        .subscribe((res : {valid, user}) => {
          if (!res.valid){
            this.error_message = "Password incorrect";
          }else{
            if(this.password == this.rePassword) {

            }else{
              this.error_message = "New passwords do not match";
            }
            }
            this.error_message = '';
            this.password = '';
            this.cPassword = '';
            this.rePassword = '';

        }, (err) => {

        });

  }
}
