import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the GroceriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groceries',
  templateUrl: 'groceries.html',
})
export class GroceriesPage {

  error_message: string = '';
  groceries: any;

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams) {
    this.updateList();
  }

  updateList() {
    this.http.get('http://localhost:8080/grocery').subscribe(res=> {
      let items = res as Array<Object>;
      for(var item of items){
        item['selected'] = false;
      }
      this.groceries = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroceriesPage');
  }

}
