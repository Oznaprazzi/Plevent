import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';

import {AmChartsService, AmChart} from "@amcharts/amcharts3-angular";
import {HttpClient} from "@angular/common/http";
import {Storage} from '@ionic/storage';
import {AddAvalibilityPlannerPage} from "../add-avalibility-planner/add-avalibility-planner";
import {UtilityService} from "../../app/UtilityService";

@Component({
  selector: 'page-avalibilityplanner',
  templateUrl: 'avalibilityplanner.html'
})
export class AvalibilityplannerPage {
  avalPlanner: any;
  eventObject: any;
  private chart: AmChart;
  user: any;
  dataprovider = [];
  showPage = false;

  constructor(private AmCharts: AmChartsService, public navCtrl: NavController, public storage: Storage, public http: HttpClient,
              public util: UtilityService) {
    this.storage.get('userObject').then((data) => {
      this.user = data;
    });

  }

  ionViewWillEnter() {
    this.chart = this.AmCharts.makeChart("chartdiv", {
      "type": "gantt",
      "theme": "dark",
      "marginRight": 70,
      "period": "DD",
      "dataDateFormat": "YYYY-MM-DD",
      "color": "#fff",
      "columnWidth": 0.5,
      "gridColor": "#fff",
      "axisColor": "#fff",
      "valueAxis": {
        "type": "date",
        "gridColor": "#fff",
        "axisColor": "#fff",
      },
      "categoryAxis": {
        "gridColor": "#fff",
        "axisColor": "#fff",
      },
      "brightnessStep": 7,
      "graph": {
        "lineAlpha": 1,
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
    var loading = this.util.presentLoadingDots();
    loading.present();
    this.storage.get('tappedEventObject').then((data) => {
      this.eventObject = data;
      this.http.get(`http://localhost:8080/availability/get_all_plan/${this.eventObject._id}`).subscribe(res => {
        this.avalPlanner = res;
       this.chart.clear();
       this.dataprovider = [];
        this.updateGanntChart(loading);
        loading.onDidDismiss(()=>{
          this.showPage = true;
        });
      }, (err) => {
        console.log("error" + err);
      });
    });


  }

  updateGanntChart(loading) {
      this.AmCharts.updateChart(this.chart, () => {
        this.parseData();
        this.chart.dataProvider = this.dataprovider;
        loading.dismissAll();
      });


  }


  parseData() {
    var category: string;
    var start: string;
    var end: string;
    var segment = [];

    for (let avalPlanner of this.avalPlanner) {
      if (category != undefined) {


        if (category == avalPlanner.name) {
          start = avalPlanner.startDate;
          end = avalPlanner.endDate;
          this.dataprovider.find(i => i.category === category).segments.push({"start": start, "end": end});
        }else if (category != avalPlanner.name){
          segment = [];
          category = avalPlanner.name;
          start = avalPlanner.startDate;
          end = avalPlanner.endDate;
          segment.push({"start": start, "end": end});
          this.dataprovider.push({"category": category, "segments": segment});
        }

      } else {
        category = avalPlanner.name;
        start = avalPlanner.startDate;
        end = avalPlanner.endDate;
        segment.push({"start": start, "end": end});
        this.dataprovider.push({"category": category, "segments": segment});
      }
    }



  }

  modifyAcalility() {
    this.navCtrl.push(AddAvalibilityPlannerPage, {});
  }


  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

}

