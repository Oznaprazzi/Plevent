import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaypointListPage } from './waypoint-list';

@NgModule({
  declarations: [
    WaypointListPage,
  ],
  imports: [
    IonicPageModule.forChild(WaypointListPage),
  ],
})
export class WaypointListPageModule {}
