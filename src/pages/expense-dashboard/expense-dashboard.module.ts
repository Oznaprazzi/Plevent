import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseDashboardPage } from './expense-dashboard';

@NgModule({
  declarations: [
    ExpenseDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseDashboardPage),
  ],
})
export class ExpenseDashboardPageModule {}
