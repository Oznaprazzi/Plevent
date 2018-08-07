import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroceriesPage } from './groceries';

@NgModule({
  declarations: [
    GroceriesPage,
  ],
  imports: [
    IonicPageModule.forChild(GroceriesPage),
  ],
})
export class GroceriesPageModule {}
