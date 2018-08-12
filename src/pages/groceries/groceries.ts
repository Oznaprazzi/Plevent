import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';

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
  event:any;

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController, public navParams: NavParams, public storage: Storage) {
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
      this.updateList();
    });
  }

  updateList() {
    this.http.get(`http://localhost:8080/grocery/${this.event._id}`).subscribe(res=> {
      this.groceries = res;
    });
  }

  deleteItem(item){
    var id = item._id;
    this.http.delete(`http://localhost:8080/grocery/item/${id}`).subscribe(res => {
      this.updateList();
    });
  }

  doAddPrompt(){
    let prompt = this.alertCtrl.create({
      title: 'Add Item',
      inputs: [{name: 'name', placeholder: 'Item name'}],
      buttons: [
        {
          text: 'Add',
          handler: data => {
            this.addItem(data);
          }
        },
        {
          text: 'Cancel',
          handler: data => {
            // Close Prompt
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    prompt.present();
  }

  private addItem(item: {name}) {
    var data = {
      description : item.name,
      event: this.event._id
    }
    this.http.post('http://localhost:8080/grocery/item', data).subscribe(res => {
      this.updateList();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroceriesPage');
  }

}
