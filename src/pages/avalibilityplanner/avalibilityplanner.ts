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
    locale: "en-us",
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
    showNonBusiness: true,
    businessBeginsHour: 9,
    businessEndsHour: 17,
    businessWeekends: false,
    cellWidthSpec: "Fixed",
    cellWidth: 40,
    crosshairType: "Header",
    autoScroll: "Drag",
    eventHeight: 30,
    floatingEvents: true,
    eventMovingStartEndEnabled: false,
    eventResizingStartEndEnabled: false,
    timeRangeSelectingStartEndEnabled: false,
    allowEventOverlap: true,
    groupConcurrentEvents: false,
    eventStackingLineHeight: 100,

    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: function (args) {
      var dp = this;
      DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add(new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        }));
      });
    },
    tasks: [
      {
        "id": 1,
        "start": "2018-08-04T00:00:00",
        "end": "2018-08-08T00:00:00",
        "text": "Event 1"
      },
      {
        "id": 2,
        "start": "2018-08-06T00:00:00",
        "end": "2018-08-11T00:00:00",
        "text": "Event 2"
      }
    ],
    eventMoveHandling: "Update",
    onEventMoved: function (args) {
      this.message("Event moved");
    },
    eventResizeHandling: "Resize",
    onEventResized: function (args) {
      this.message("Event resized");
    },
    eventDeleteHandling: "Deleted",
    onEventDeleted: function (args) {
      this.message("Event deleted");
    },

    eventCreateHandling: "Create",
    onEventDeleted: function (args) {
      this.message("Event Created");
    },
    eventClickHandling: "Disabled",
    eventHoverHandling: "Disabled",
    linkCreateHandling: "Disabled"

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
