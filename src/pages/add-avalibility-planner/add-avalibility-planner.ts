import {Component, ViewChild} from '@angular/core';
import {Content, ModalController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';


@Component({
  selector: 'page-add-avalibility-planner',
  templateUrl: 'add-avalibility-planner.html',
})
export class AddAvalibilityPlannerPage {
  eventObject: any;
  avalPlan: any;

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public modalCtrl: ModalController, public storage: Storage) {
    storage.get('tappedEventObject').then((data) => {
      this.eventObject = data
      this.updateList();
    });
  }


  openModal() {
    let modal = this.modalCtrl.create(ModalSelectDatePage, {"eventObject": this.eventObject});
    modal.present();
  }

  updateList() {
    this.http.get(`http://localhost:8080/availability/get_aval_planner/${this.eventObject._id}`).subscribe(res => {
      //TODO: need to filter this by users
      this.avalPlan = res;
    });
  }


}


@Component({
  templateUrl: 'selectDateModal.html'
})
export class ModalSelectDatePage {
  @ViewChild(Content) content: Content;
  error_message = '';
  toDate: Date;
  fromDate: Date;
  eventObject: any;
  avalPlan: any;
  user: any;

  constructor(public navCtrl: NavController, public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public http: HttpClient, public storage: Storage) {
    this.eventObject = params.get('eventObject');
    storage.get('userObject').then((data) => {
      this.user = data;
      console.log(this.user);

    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setDates() {
    this.http.post('http://localhost:8080/availability/create_planner', {
        startDate: this.toDate,
        endDate: this.fromDate,
        event: this.eventObject,
        user: this.user
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        this.updateList();
        this.dismiss();
      }, (err) => {
        this.error_message = "Try again ";

      });
  }

  private updateList() {
    this.http.get(`http://localhost:8080/availability/get_aval_planner/${this.eventObject._id}`).subscribe(res => {
      this.avalPlan = res;
      this.navCtrl.push(AddAvalibilityPlannerPage, {});
    });
  }
}
