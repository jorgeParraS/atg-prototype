import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickupPage } from './pickup';

@NgModule({
  declarations: [
    PickupPage,
  ],
  imports: [
    IonicPageModule.forChild(PickupPage),
  ],
  exports: [
    PickupPage
  ]
})
export class PickupPageModule {}
