import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaypointPlannerPage } from './waypoint-planner';

@NgModule({
  declarations: [
    WaypointPlannerPage,
  ],
  imports: [
    IonicPageModule.forChild(WaypointPlannerPage),
  ],
})
export class WaypointPlannerPageModule {}
