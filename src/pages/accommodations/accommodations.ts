import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { AddAccommodationPage } from "../addAccommodation/addAccommodation"
import { DatePipe } from '@angular/common'

@Component({
  selector: 'page-accommodationPlanner',
  templateUrl: 'accommodations.html'
})
export class AccommodationsPage {
  accommodations:any;
  constructor(public navCtrl: NavController, public http: HttpClient, public datepipe: DatePipe) {
    this.http.get('http://localhost:8080/accommo/getAccommo')
      .subscribe(res => {
      this.accommodations = res;
    }, (err) => {
      //this.error_message = "Please fill in all the fields";
    });
  }

  addAccomo(){
    this.navCtrl.push(AddAccommodationPage,{

    });
  }

}
