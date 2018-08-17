import {Injectable} from "@angular/core";
import { LoadingController } from 'ionic-angular';

@Injectable()
export class UtilityService{

  constructor(public loadingCtrl: LoadingController){

  }

  presentLoadingDots() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      animation: 'fade-in',
      showBackdrop: true,
      cssClass: loading
    });

    return loading;
  }
}
