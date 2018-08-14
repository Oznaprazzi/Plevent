import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlockedFriendsPage } from './blocked-friends';

@NgModule({
  declarations: [
    BlockedFriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(BlockedFriendsPage),
  ],
})
export class BlockedFriendsPageModule {}
