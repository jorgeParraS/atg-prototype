import { Component } from '@angular/core';

/**
 * Generated class for the PickupComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupComponent {

  text: string;

  constructor() {
    console.log('Hello PickupComponent Component');
    this.text = 'Hello World';
  }

}
