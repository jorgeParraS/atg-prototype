import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BasemapComponent } from './basemap';

@NgModule({
  declarations: [
    BasemapComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    BasemapComponent
  ]
})
export class BasemapComponentModule {}
