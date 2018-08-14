import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  users: any
  matchUsers: any

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    this.retriveUsers();
  }

  findItem(event: any) {
    let val = event.target.value;
    if(val && val.trim() !== ''){
      this.matchUsers = this.users.filter(function (user) {

        if(user.username.includes(val)){
          return user;
        }
      })
    }
  }

  retriveUsers() {
    this.http.get(`http://localhost:8080/users`).subscribe(res => {
      this.users = res as Array<Object>;
    }, (err) => {
      console.log("error" + err);
    });
  }

}
