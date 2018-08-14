import { Component } from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-username-modal',
  templateUrl: 'username-modal.html'
})
export class UsernameModalPage {
  username: any;
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

  edit_username(){
    console.log(this.user.username);
    this.http.post(`http://localhost:8080/users/edit_username/${this.user._id}`, {
        username: this.user.username
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        if(!res){
          this.error_message = "Username exists";
        }else{
          this.getUser();
          this.dismiss();
          this.presentAlert();
        }
      });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Edit username',
      subTitle: 'Successfully updated username!',
      buttons: ['Ok']
    });
    alert.present();
  }
}
