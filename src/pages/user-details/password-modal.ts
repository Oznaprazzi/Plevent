import { Component } from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-password-modal',
  templateUrl: 'password-modal.html'
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
              this.http.post(`http://localhost:8080/users/change_password/${this.user._id}`, {
                  password: this.password
                },
                {
                  headers: {'Content-Type': 'application/json'}
                })
                .subscribe(res => {
                  if(res.message){
                    this.presentErrorAlert(res.message);
                    return;
                  }
                  this.getUser();
                  this.dismiss();
                  this.presentAlert();
                });
              this.error_message = '';
              this.password = '';
              this.cPassword = '';
              this.rePassword = '';
            }else{
              this.error_message = "New passwords do not match";
            }
          }
        }, (err) => {

        });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Change password',
      subTitle: 'Password changed successfully!',
      buttons: ['Ok']
    });
    alert.present();
  }

  presentErrorAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['Ok']
    });
    alert.present();
  }
}
