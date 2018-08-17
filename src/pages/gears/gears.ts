import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {UtilityService} from "../../app/UtilityService";

/**
 * Generated class for the GearsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gears',
  templateUrl: 'gears.html',
})
export class GearsPage {

  gears: any;
  event: any;
  showPage = false;

  constructor(public navCtrl: NavController, public http: HttpClient, public alertCtrl: AlertController,
              public navParams: NavParams, public storage: Storage, public util: UtilityService) {
    var loading = this.util.presentLoadingDots();
    loading.present();
    storage.get('tappedEventObject').then((data) => {
      this.event = data;
      this.loadQueries();
      loading.dismissAll();
    });
    loading.onDidDismiss(()=>{
      this.showPage = true;
    });
  }

  async loadQueries(){
    await this.updateList();
  }

  private updateList() {
    this.http.get(`http://localhost:8080/gears/${this.event._id}`).subscribe(res => {
      this.gears = res;
    });
  }

  doDeletePrompt(item){
    const confirm = this.alertCtrl.create({
      title: 'Delete this item?',
      message: 'This item may be important!',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(item);
          }
        },
        {
          text: 'No',
          handler: () => {
            // Close prompt
          }
        }
      ]
    });
    confirm.present();
  }

  private deleteItem(item){
    var id = item._id;
    this.http.delete(`http://localhost:8080/gears/item/${id}`).subscribe(res => {
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
            // Close prompt
          }
        }
      ]
    });
    prompt.present();
  }

  private addItem(item: {name}){
    var data = {
      description: item.name,
      event: this.event._id
    }
    this.http.post('http://localhost:8080/gears/item', data).subscribe(res => {
      this.updateList();
    });
  }

}
