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
        for(let accommo of this.accommodations) {
          this.datepipe.transform(accommo.fromDate, 'dd-MM-yyyy');
          this.datepipe.transform(accommo.toDate, 'dd-MM-yyyy');
        }




    }, (err) => {
      //this.error_message = "Please fill in all the fields";
    });
  }

  addAccomo(){
    this.navCtrl.push(AddAccommodationPage,{

    });
  }

}
