import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';
import {SigninPage} from "../../../src/pages/chat-room/signin/signin";

const config = {
  apiKey: "AIzaSyCo8dhuRElM4vzR60IIFpcJdIAUsZg8gF0",
  authDomain: "plevent-carrot-group.firebaseapp.com",
  databaseURL: "https://plevent-carrot-group.firebaseio.com",
  projectId: "plevent-carrot-group",
  storageBucket: "plevent-carrot-group.appspot.com",
  messagingSenderId: "967840979254"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

