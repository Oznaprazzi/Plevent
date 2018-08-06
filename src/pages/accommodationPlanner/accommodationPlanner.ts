import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'page-accommodationPlanner',
  templateUrl: 'accommodationPlanner.html'
})
export class AccommodationPlannerPage {
  accommodations:any;
  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.http.get('http://localhost:8080/accommo/getAccommo')
      .subscribe(res => {
      this.accomodations = res;


    }, (err) => {
      this.error_message = "Please fill in all the fields";
    });
  }

}
