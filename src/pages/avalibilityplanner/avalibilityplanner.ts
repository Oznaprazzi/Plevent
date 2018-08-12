import {Component} from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';

import {AmChartsService, AmChart} from "@amcharts/amcharts3-angular";
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {AddAvalibilityPlannerPage} from "../add-avalibility-planner/add-avalibility-planner";

@Component({
  selector: 'page-avalibilityplanner',
  templateUrl: 'avalibilityplanner.html'
})
export class AvalibilityplannerPage {
  avalPlanner: any;
  eventObject: any;
  private chart: AmChart;

  constructor( private AmCharts: AmChartsService, public navCtrl: NavController, public storage: Storage, public http: HttpClient, public modalCtrl: ModalController) {


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
      "dataProvider": [{}],
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
        "enabled": false
      }
    });
  }

  updateGanntChart() {
    this.AmCharts.updateChart(this.chart, () => {
      // Change whatever properties you want
      this.chart.dataProvider = [{
        "category": "Module #1",
        "segments": [{
          "start": "2016-01-01",
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
        }]
      }]
    });
  }

  modifyAcalility() {
    this.navCtrl.push(AddAvalibilityPlannerPage, {
    });
    this.updateGanntChart();
  }


  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }


  getEventPeriodDates() {
    this.http.get(`http://localhost:8080/availability/get_aval_planner/${this.eventObject._id}`).subscribe(res => {
      this.avalPlanner = res;
    }, (err) => {
      console.log("error" + err);
    });
  }

}

// @Component({
//   templateUrl: 'src/pages/add-avalibility-planner/selectDateModal.html'
// })
// export class ModalSelectDatePage {
//
//   error_message = '';
//   toDate: Date;
//   fromDate: Date;
//   eventObject: any;
//
//   constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, public http: HttpClient, public storage: Storage) {
//     this.eventObject = params.get('eventObject');
//   }
//
//   dismiss() {
//     this.viewCtrl.dismiss();
//   }
//
//   setDates() {
//     console.log("In Modal Evenet Object " + this.eventObject.eventName);
//     this.http.post('http://localhost:8080/availability/create_planner', {
//         toDate: this.toDate,
//         fromDate: this.fromDate,
//         event: this.eventObject
//       },
//       {
//         headers: {'Content-Type': 'application/json'}
//       })
//       .subscribe(res => {
//         this.http.post(`http://localhost:8080/events/add_aval_planner/${this.eventObject._id}`, {},
//           {
//             headers: {'Content-Type': 'application/json'}
//           })
//           .subscribe(res => {
//           }, (err) => {
//             this.error_message = "Error in updating event aval planner";
//           });
//         this.dismiss();
//       }, (err) => {
//         this.error_message = "Try again ";
//
//       });
//   }
// }
