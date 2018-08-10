import {Component} from '@angular/core';
import {Platform, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';

import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'page-avalibilityplanner',
  templateUrl: 'avalibilityplanner.html'
})
export class AvalibilityplannerPage {

  constructor(public navCtrl: NavController, public http: HttpClient, public modalCtrl: ModalController) {
    this.openModal();
  }

  openModal() {

    let modal = this.modalCtrl.create(ModalSelectDatePage, {});
    modal.present();
  }

}


@Component({
  templateUrl: 'selectDateModal.html'
})
export class ModalSelectDatePage {

  error_message = '';

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public http: HttpClient) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateAccommo(){
  console.log("button pushed");
  }
}
