import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {PasswordModalPage} from "./password-modal";
import {UsernameModalPage} from "./username-modal";
import {UtilityService} from "../../app/UtilityService";


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
  showPage = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient,
              public alertCtrl: AlertController, public datepipe: DatePipe, public modalCtrl: ModalController, public util: UtilityService) {
    var loading = this.util.presentLoadingDots();
    loading.present();
    storage.get('userid').then((data) => {
      this.userid = data;
      this.loadQueries();
      loading.dismissAll();
    });
    loading.onDidDismiss(()=>{
      this.showPage = true;
    });
  }

  async loadQueries(){
    await this.getUser();
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
    let modal = this.modalCtrl.create(UsernameModalPage);
    modal.onDidDismiss(() => {
      this.getUser();
    });
    modal.present();
  }

  changePassword(){
    let modal = this.modalCtrl.create(PasswordModalPage);
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
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
