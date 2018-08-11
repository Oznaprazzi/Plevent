import {Injectable} from "@angular/core";
import { HttpClient} from '@angular/common/http';

@Injectable()
export class UtilityService {
  constructor(public http: HttpClient) {
  }

  updateAccommodations(){
    this.http.get('http://localhost:8080/accommo/get_accommo').subscribe(res => {
      return res;
    });
  }
}
