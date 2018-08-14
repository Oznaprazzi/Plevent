import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import {BlockedFriendsPage} from "../blocked-friends/blocked-friends";
import {FriendsPage} from "../friends/friends";
import {FindFriendsPage} from "../find-friends/find-friends";


@Component({
  selector: 'page-friendslist',
  templateUrl: 'friendslist.html',
  template:   `
    <ion-tabs  >
      <ion-tab tabTitle="Friends" [root]="tab1"></ion-tab>
      <ion-tab tabTitle="Find Friends" [root]="tab2"></ion-tab>
      <ion-tab tabTitle="Blocked Friends" [root]="tab3"></ion-tab>
    </ion-tabs>`
})
export class FriendslistPage {
  tab1 = FriendsPage;
  tab2 = FindFriendsPage;
  tab3 = BlockedFriendsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}


