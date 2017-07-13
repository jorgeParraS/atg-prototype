import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PickupComponent } from './pickup';

@NgModule({
  declarations: [
    PickupComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    PickupComponent
  ]
})
export class PickupComponentModule {}
