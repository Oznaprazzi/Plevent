import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WaypointListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 interface Waypoint {
   _id?: any
   title: string
   address: string 
   latitude: number
   longitude: number
   event: any
 }

@IonicPage()
@Component({
  selector: 'page-waypoint-list',
  templateUrl: 'waypoint-list.html',
})
export class WaypointListPage {

  private event : any;
  waypoints: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage: Storage, public alertCtrl: AlertController) {
    storage.get('tappedEventObject').then(data => {
      this.event = data;
      this.updateList();
    });
  }

  private updateList(){
    this.http.get(`http://localhost:8080/waypoints/${this.event._id}`).subscribe(res => {
      this.waypoints = res;
      console.log(res);
    });
  }

  doAddPrompt(){
    let prompt = this.alertCtrl.create({
      title: 'Add Waypoint',
      inputs: [
        {name: 'title', placeholder: 'Enter title...'}, 
        {name: 'address', placeholder: 'Enter address...'}
      ],
      buttons: [
        {
          text: 'Add',
          handler: data => {
            this.addPoint(data);
          }
        },
        {
          text: 'Cancel'
        }
      ]
    });
    prompt.present();
  }

  doDeletePrompt(point: Waypoint){
    const confirm = this.alertCtrl.create({
      title: 'Delete this waypoint?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deletePoint(point);
          }
        },
        {
          text: 'No'
        }
      ]
    });
    confirm.present();
  }

  doEditPrompt(point: Waypoint){
    let prompt = this.alertCtrl.create({
      title: 'Edit Point',
      subTitle: 'Only edit the fields you want to change',
      inputs: [
        { name: 'title', placeholder: 'Enter title...'},
        { name: 'address', placeholder: 'Enter address...'}
      ],
      buttons: [
        {
          text: 'Edit',
          handler: (data: Waypoint) => {
            this.editPoint(point._id, data);
          }
        },
        { text: 'Cancel' }
      ]
    });
    prompt.present();
  }

  private editPoint(id, data: any){
    var request = this.constructRequest(data);
    this.http.post(`http://localhost:8080/waypoints/point/${id}`, request).subscribe(res => {
      this.updateList();
    });
  }

  private constructRequest(data: any){
    var reqData = {}; // request data
    if(data.title){
      reqData['title'] = data.title;
    }
    if(data.address){
      reqData['address'] = data.address;
    }
    return reqData;
  }

  private deletePoint(point: Waypoint){
    var id = point._id;
    this.http.delete(`http://localhost:8080/waypoints/point/${id}`).subscribe(res => {
      this.updateList();
    });
  }

  private addPoint(point: Waypoint){
    var data = {
      title: point.title,
      address: point.address,
      longitude: 0,
      latitude: 0,
      event: this.event._id
    }
    this.http.post('http://localhost:8080/waypoints/point', data).subscribe(res => {
      this.updateList();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaypointListPage');
  }

}
