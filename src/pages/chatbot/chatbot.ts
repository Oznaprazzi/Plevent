import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, List } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChatbotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface User {
  fname: string,
  lname: string
}

@IonicPage()
@Component({
  selector: 'page-chatbot',
  templateUrl: 'chatbot.html',
})
export class ChatbotPage {

  @ViewChild(Content) contentArea: Content;
  @ViewChild(List, {read: ElementRef}) chatList: ElementRef;

  data = {
    user: null,
    message: null
  }
  user: User;
  chats: any = [];
  private mutationObserver: MutationObserver;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage : Storage) {
  }

  send() {
    // record the chat logs
    const message = {
      user: this.data.user,
      message: this.data.message
    }
    this.chats.push(message);
    // send message to server
    this.http.post('http://localhost:8080/chatbot', message).subscribe(res => {
      var reply = res;
      this.chats.push(reply);
    });
    this.data.message = null;
    this.contentArea.scrollToBottom();
  }

  getUser(){
    this.storage.get('userObject').then(data => {
      this.user = data;
      this.data = {
        user: `${this.user.fname} ${this.user.lname}`,
        message: null
      }
    }).catch(err => console.log(err));
  }

  ionViewDidLoad() {
    this.getUser();
    this.mutationObserver = new MutationObserver((mutations) => {
      this.contentArea.scrollToBottom();
    });
    this.mutationObserver.observe(this.chatList.nativeElement, {
      childList: true
    })
    console.log('ionViewDidLoad ChatbotPage');
  }

}
