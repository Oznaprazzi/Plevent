import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';

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
  user: any;
  dataprovider = [];

  constructor(private AmCharts: AmChartsService, public navCtrl: NavController, public storage: Storage, public http: HttpClient, public modalCtrl: ModalController) {

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
    this.storage.get('userObject').then((data) => {
      this.user = data;
    this.storage.get('tappedEventObject').then((data) => {
      this.eventObject = data;
      this.http.get(`http://localhost:8080/availability/get_all_plan/${this.eventObject._id}`).subscribe(res => {

        this.avalPlanner = res;
        console.log(this.avalPlanner);
        this.updateGanntChart();
      }, (err) => {
        console.log("error" + err);
      });
    });
    });

  }

  updateGanntChart() {


      this.AmCharts.updateChart(this.chart, () => {
        // Change whatever properties you want


        // var segment = [{"start": "2016-04-18", "end": "2016-04-30"}];
        // this.dataprovider.push({"category": "dipen", "segments": segment});
        // var segment = [{"start": "2016-04-17", "end": "2017-04-30"}];
        // this.dataprovider.push({"category": "casey", "segments": segment});

        this.parseData();
        this.chart.dataProvider = this.dataprovider;
        // this.chart.dataProvider = [{
        //   "category": "Casey",
        //   "segments": [{
        //     "start": "2016-01-01",
        //     "end": "2016-01-14",
        //   }, {
        //     "start": "2015-01-16",
        //     "end": "2016-01-27",
        //   }, {
        //     "start": "2016-02-05",
        //     "end": "2016-04-18",
        //   }, {
        //     "start": "2016-04-18",
        //     "end": "2016-04-30",
        //   }]
        // }]
      });


  }


  parseData() {
    var category: string;
    var start: string;
    var end: string;
//TODO: need to update the models to also store the userid so we cna comapare here
    var segment = [];

    for (let avalPlanner of this.avalPlanner) {
      if (category != undefined) {

        console.log(category === avalPlanner.name);
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
    console.log(this.dataprovider);


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

