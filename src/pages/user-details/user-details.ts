import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {PasswordModalPage} from "./password-modal";


/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  user:any;
  userid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController, public datepipe: DatePipe, public modalCtrl: ModalController) {
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

  saveFnameFunc(data){
    this.http.post(`http://localhost:8080/users/user/${this.user._id}`, {
        fname: data.fname
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        this.getUser();
      });
  }

  saveLnameFunc(data){
    this.http.post(`http://localhost:8080/users/user/${this.user._id}`, {
        lname: data.lname
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        this.getUser();
      });
  }

  savedobFunc(data){
    this.http.post(`http://localhost:8080/users/user/${this.user._id}`, {
        bdate: data.bdate
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        this.getUser();
      });
  }

  saveUesrnameFunc(data){
    this.http.post(`http://localhost:8080/users/user/${this.user._id}`, {
        username: data.username
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        this.getUser();
      });
  }

  edit_fname(){
    this.showPrompt("Edit First Name", "fname", this.user.fname, "text", "fname");
  }

  edit_lname(){
    this.showPrompt("Edit Last Name", "lname", this.user.lname, "text","lname");
  }

  edit_dob(){
    let dob =this.datepipe.transform(this.user.bdate, 'yyyy-MM-dd');
    this.showPrompt("Edit Date of Birth", "bdate", dob, "date", "dob");
  }

  edit_username(){
    this.showPrompt("Edit Username", "username", this.user.username, "text","username");
  }

  changePassword(){
    let modal = this.modalCtrl.create(PasswordModalPage,{"user": this.user});
    modal.onDidDismiss(() => {
      this.getUser();
    });
    modal.present();
  }

  showPrompt(title, name, value:any, datatype, type) {
    const prompt = this.alertCtrl.create({
      title: title,
      inputs: [
        {
          name: name,
          value: value,
          type: datatype
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Save',
          handler: data => {
            if(type == "fname"){
              this.saveFnameFunc(data);
            }else if(type == "lname"){
              this.saveLnameFunc(data);
            }else if(type == "dob"){
              this.savedobFunc(data);
            }else if(type == "username"){
              this.saveUesrnameFunc(data);
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
