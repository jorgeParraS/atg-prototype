import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomeComponent } from './home';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeComponentModule {}
