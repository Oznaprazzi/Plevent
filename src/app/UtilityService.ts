import {Injectable} from "@angular/core";
import { LoadingController } from 'ionic-angular';

@Injectable()
export class UtilityService{

  constructor(public loadingCtrl: LoadingController){

  }

  presentLoadingDots() {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      showBackdrop: false
    });

    return loading;
  }
}
