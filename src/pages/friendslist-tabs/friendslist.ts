import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import {FriendsPage} from "../friends/friends";
import {FindFriendsPage} from "../find-friends/find-friends";
import {FriendRequestPage} from "../friend-request/friend-request";


@Component({
  selector: 'page-friendslist',
  templateUrl: 'friendslist.html',
  template:   `
    <ion-tabs  >
      <ion-tab tabTitle="Friends" [root]="tab1"></ion-tab>
      <ion-tab tabTitle="Find Friends" [root]="tab2"></ion-tab>
      <ion-tab tabTitle="Friends Request" [root]="tab3"></ion-tab>
    </ion-tabs>`
})
export class FriendslistPage {
  tab1 = FriendsPage;
  tab2 = FindFriendsPage;
  tab3 = FriendRequestPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
}


