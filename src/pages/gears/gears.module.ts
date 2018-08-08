import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GearsPage } from './gears';

@NgModule({
  declarations: [
    GearsPage,
  ],
  imports: [
    IonicPageModule.forChild(GearsPage),
  ],
})
export class GearsPageModule {}
