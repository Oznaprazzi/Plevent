import {Component} from '@angular/core';
import {Platform, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {DayPilot } from "daypilot-pro-angular";


import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
@Component({
  template: '<daypilot-gantt [config]="config"></daypilot-gantt>',
  selector: 'page-avalibilityplanner',
  templateUrl: 'avalibilityplanner.html'
})
export class AvalibilityplannerPage {
  avalPlanner: any;
  eventObject: any;

  constructor(public navCtrl: NavController, public storage: Storage, public http: HttpClient, public modalCtrl: ModalController) {
    storage.get('tappedEventObject').then((data) => {
      this.eventObject = data;
      if (!this.eventObject.hasAvalibilityPlanner) {
        this.openModal(this.eventObject);
      }
      this.getEventPeriodDates();
    });
  }

  openModal(event) {
    let modal = this.modalCtrl.create(ModalSelectDatePage, {"eventObject": event});
    modal.present();
  }

  getEventPeriodDates() {
    this.http.get(`http://localhost:8080/availability/get_aval_planner/${this.eventObject._id}`).subscribe(res => {
      this.avalPlanner = res;
      console.log("Evenet Object "+this.eventObject);
      console.log(this.avalPlanner);
    }, (err) => {
      console.log("error" + err);
    });
  }
  config: any = {
    cellWidthSpec: "Fixed",
    cellWidth: 40,
    days: DayPilot.Date.today().daysInMonth(),
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    timeHeaders: [
      {
        "groupBy": "Month"
      },
      {
        "groupBy": "Day",
        "format": "d"
      }
    ],
    scale: "Day",
    taskHeight: 30,
    rowHeaderHideIconEnabled: false,
    rowMoveHandling: "Update",
    onRowMoved: function (args) {
      this.message("Row moved");
    },
    rowCreateHandling: "Enabled",
    onRowCreate: function (args) {
      this.tasks.add(new DayPilot.Task({
        id: DayPilot.guid(),
        text: args.text,
        start: new DayPilot.Date().getDatePart(),
        end: new DayPilot.Date().getDatePart().addDays(1)
      }));
    },
    taskMoveHandling: "Update",
    onTaskMoved: function (args) {
      this.message("Task moved");
    },
    linkCreateHandling: "Disabled",
    onLinkCreated: "Disabled",
    tasks: [
      {
        "id": 1,
        "text": "Group 1",
        "complete": 35,
        "children": [
          {
            "id": 2,
            "start": "2018-08-04T00:00:00",
            "end": "2018-08-11T00:00:00",
            "text": "Task 1",
            "complete": 60
          },
          {
            "id": 3,
            "start": "2018-08-11T00:00:00",
            "end": "2018-08-16T00:00:00",
            "text": "Task 2",
            "complete": 0
          },
          {
            "id": 4,
            "start": "2018-08-16T00:00:00",
            "type": "Milestone",
            "text": "Milestone 1",
            "end": "2018-08-16T00:00:00"
          }
        ],
        "start": "2018-08-04T00:00:00",
        "end": "2018-08-16T00:00:00"
      }
    ],
    links: [
      {
        "from": 2,
        "to": 3,
        "type": "FinishToStart"
      }
    ]
  }



}

@Component({
  templateUrl: 'selectDateModal.html'
})
export class ModalSelectDatePage {

  error_message = '';
  toDate: Date;
  fromDate: Date;
  eventObject: any;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public http: HttpClient, public storage: Storage) {
    this.eventObject = params.get('eventObject');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setDates() {
    console.log(" modeal event "+ this.eventObject);
    this.http.post('http://localhost:8080/availability/create_planner', {
        toDate: this.toDate,
        fromDate: this.fromDate,
        event: this.eventObject
      },
      {
        headers: {'Content-Type': 'application/json'}
      })
      .subscribe(res => {
        this.http.post(`http://localhost:8080/events/add_aval_planner/${this.eventObject._id}`, {},
          {
            headers: {'Content-Type': 'application/json'}
          })
          .subscribe(res => {
          }, (err) => {
            this.error_message = "Error in updating event aval planner";
          });
        this.dismiss();
      }, (err) => {
        this.error_message = "Try again ";

      });
  }
}
