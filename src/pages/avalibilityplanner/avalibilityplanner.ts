import {Component} from '@angular/core';
import {Platform, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
//import {DayPilot } from "daypilot-pro-angular";

import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
@Component({
  selector: 'page-avalibilityplanner',
  templateUrl: 'avalibilityplanner.html'
})
export class AvalibilityplannerPage {
  avalPlanner: any;
  eventObject: any;
  private chart: AmChart;
  constructor(private AmCharts: AmChartsService,public navCtrl: NavController, public storage: Storage, public http: HttpClient, public modalCtrl: ModalController) {
    storage.get('tappedEventObject').then((data) => {
      this.eventObject = data;
      if (!this.eventObject.hasAvalibilityPlanner) {
        this.openModal(this.eventObject);
      }
      this.getEventPeriodDates();

    });

  }

  ngAfterViewInit() {
    this.chart = this.AmCharts.makeChart("chartdiv", {
      "type": "gantt",
      "theme": "light",
      "marginRight": 70,
      "period": "DD",
      "dataDateFormat": "YYYY-MM-DD",
      "columnWidth": 0.5,
      "valueAxis": {
        "type": "date"
      },
      "brightnessStep": 7,
      "graph": {
        "fillAlphas": 1,
        "lineAlpha": 1,
        "lineColor": "#fff",
        "fillAlphas": 0.85,
        "balloonText": "<b>[[task]]</b>:<br />[[open]] -- [[value]]"
      },
      "rotate": true,
      "categoryField": "category",
      "segmentsField": "segments",
      "colorField": "color",
      "startDateField": "start",
      "endDateField": "end",
      "dataProvider": [ {
        "category": "Module #1",
        "segments": [ {
          "start": "2015-01-01",
          "end": "2016-01-14",
          "color": "#b9783f",
          "task": "Gathering requirements"
        }, {
          "start": "2016-01-16",
          "end": "2016-01-27",
          "task": "Producing specifications"
        }, {
          "start": "2016-02-05",
          "end": "2016-04-18",
          "task": "Development"
        }, {
          "start": "2016-04-18",
          "end": "2016-04-30",
          "task": "Testing and QA"
        } ]
      }, {
        "category": "Module #2",
        "segments": [ {
          "start": "2016-01-08",
          "end": "2016-01-10",
          "color": "#cc4748",
          "task": "Gathering requirements"
        }, {
          "start": "2016-01-12",
          "end": "2016-01-15",
          "task": "Producing specifications"
        }, {
          "start": "2016-01-16",
          "end": "2016-02-05",
          "task": "Development"
        }, {
          "start": "2016-02-10",
          "end": "2016-02-18",
          "task": "Testing and QA"
        } ]
      }, {
        "category": "Module #3",
        "segments": [ {
          "start": "2016-01-02",
          "end": "2016-01-08",
          "color": "#cd82ad",
          "task": "Gathering requirements"
        }, {
          "start": "2016-01-08",
          "end": "2016-01-16",
          "task": "Producing specifications"
        }, {
          "start": "2016-01-19",
          "end": "2016-03-01",
          "task": "Development"
        }, {
          "start": "2016-03-12",
          "end": "2016-04-05",
          "task": "Testing and QA"
        } ]
      }, {
        "category": "Module #4",
        "segments": [ {
          "start": "2016-01-01",
          "end": "2016-01-19",
          "color": "#2f4074",
          "task": "Gathering requirements"
        }, {
          "start": "2016-01-19",
          "end": "2016-02-03",
          "task": "Producing specifications"
        }, {
          "start": "2016-03-20",
          "end": "2016-04-25",
          "task": "Development"
        }, {
          "start": "2016-04-27",
          "end": "2016-05-15",
          "task": "Testing and QA"
        } ]
      }, {
        "category": "Module #5",
        "segments": [ {
          "start": "2016-01-01",
          "end": "2016-01-12",
          "color": "#448e4d",
          "task": "Gathering requirements"
        }, {
          "start": "2016-01-12",
          "end": "2016-01-19",
          "task": "Producing specifications"
        }, {
          "start": "2016-01-19",
          "end": "2016-03-01",
          "task": "Development"
        }, {
          "start": "2016-03-08",
          "end": "2016-03-30",
          "task": "Testing and QA"
        } ]
      } ],
      "valueScrollbar": {
        "autoGridCount": true
      },
      "chartCursor": {
        "cursorColor": "#55bb76",
        "valueBalloonsEnabled": false,
        "cursorAlpha": 0,
        "valueLineAlpha": 0.5,
        "valueLineBalloonEnabled": true,
        "valueLineEnabled": true,
        "zoomable": false,
        "valueZoomable": true
      },
      "export": {
        "enabled": true
      }
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
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
