import { Component } from '@angular/core';
import { MapComponent } from '../map/map';
import { HomeComponent } from '../home/home';
/**
 * Generated class for the TabsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {

  tab1Root = HomeComponent;
  tab4Root = MapComponent;

  constructor() {
    console.log('Hello TabsComponent Component');
  }

}
