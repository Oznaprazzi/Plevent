import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the GearsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friendslist',
  templateUrl: 'friendslist.html',
})
export class FriendslistPage {

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController,public navParams: NavParams, public storage: Storage) {
  }



}
