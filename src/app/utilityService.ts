import {Injectable} from "@angular/core";

@Injectable()
export class UtilityService{

  getEvent(storage){
    storage.get('event').then((data) => {
      return data;
    });
  }
}
