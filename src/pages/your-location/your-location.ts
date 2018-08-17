import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import leaflet from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

/**
 * Generated class for the YourLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-your-location',
  templateUrl: 'your-location.html',
})
export class YourLocationPage {
  @ViewChild('map') mapContainer : ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController, public http: HttpClient, public nativeGeocoder: NativeGeocoder) {
  }

  getAddresses(){

  }

  loadMap(){
    this.map = leaflet.map('map').fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', e => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        this.doAlert('Information', 'This is your current location.');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    }).on('locationerror', (err) => {
      this.doAlert('Error Occured', err.message);
    })
  }
  private doAlert(title: string ,message: string){
    const alert = this.alertCtrl.create({
      title,
      message,
      buttons: [{
        text: 'OK'
      }]
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad YourLocationPage');
  }

}
