import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-friendslist',
  templateUrl: 'friendslist.html',
  template:  `
    <ion-tabs class="tabs-basic">
      <ion-tab tabTitle="Music" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="Movies" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="Games" [root]="rootPage"></ion-tab>
    </ion-tabs>`
})
export class FriendslistPage {
  tab1: any;
  tab2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = Tab1;
    this.tab2 = Tab2;
  }



}

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Heart</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>Tab 1</ion-content>`
})
export class Tab1 {
  constructor(public navCtrl: NavController) {
    // Id is 1, nav refers to Tab1
    console.log("here");
  }
}

@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Star</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>Tab 2</ion-content>`
})
export class Tab2 {
  constructor(public navCtrl: NavController) {
    // Id is 1, nav refers to Tab1
    console.log("here")
  }
}
