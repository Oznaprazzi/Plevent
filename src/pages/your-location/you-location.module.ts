import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaypointPlannerPage } from './your-location';

@NgModule({
  declarations: [
    WaypointPlannerPage,
  ],
  imports: [
    IonicPageModule.forChild(WaypointPlannerPage),
  ],
})
export class WaypointPlannerPageModule {}
