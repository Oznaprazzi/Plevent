import {Component, ViewChild} from '@angular/core';
import {
  AlertController, Content, ModalController, NavController, NavParams, Platform,
  ViewController
} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {EditAvalPage} from "./edit-avalplan";


@Component({
  selector: 'page-add-avalibility-planner',
  templateUrl: 'add-avalibility-planner.html',
})
export class AddAvalibilityPlannerPage {
  eventObject: any;
  avalPlan: any;
  user: any;

  constructor( public alertCtrl: AlertController,public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public modalCtrl: ModalController, public storage: Storage) {
    storage.get('tappedEventObject').then((data) => {
      this.eventObject = data;
      storage.get('userObject').then((data) => {
        this.user = data;
        this.updateList();
      });

    });

  }


  openModal() {
    let modal = this.modalCtrl.create(ModalSelectDatePage, {"eventObject": this.eventObject});
    modal.onDidDismiss(() => {
      this.updateList();
    });
    modal.present();
  }

  updateList() {
    this.http.get(`http://localhost:8080/availability/get_aval_planner/${this.eventObject._id}/${this.user._id}`).subscribe(res => {

      this.avalPlan = res;
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
    this.http.delete(`http://localhost:8080/availability/delete_plan/${id}`).subscribe(res => {
      this.updateList();
    });
  }
  openEditModal(avalPlanObject, userObject) {
    let modal = this.modalCtrl.create(EditAvalPage, {"avalPlanObject": avalPlanObject, "userObject": userObject, "eventObject": this.eventObject});

    modal.onDidDismiss(() => {
      this.updateList();
    });
    modal.present();
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

  constructor( public navCtrl: NavController, public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public http: HttpClient, public storage: Storage) {
    this.eventObject = params.get('eventObject');
    storage.get('userObject').then((data) => {
      this.user = data;

    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setDates() {
    var fullname = this.user.fname + " " + this.user.lname;

    this.http.post('http://localhost:8080/availability/create_planner', {
        startDate: this.fromDate,
        endDate: this.toDate,
        event: this.eventObject._id,
        name: fullname,
        user: this.user._id
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
         this.dismiss();
      }, (err) => {
        this.error_message = "Try again ";

      });
  }


}
