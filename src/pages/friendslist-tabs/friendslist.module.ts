import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendslistPage } from './friendslist';

@NgModule({
  declarations: [
    FriendslistPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendslistPage),
  ],
})
export class FriendslistPageModule {}
