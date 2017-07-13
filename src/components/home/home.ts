import { Component } from '@angular/core';

/**
 * Generated class for the HomeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomeComponent {

  text: string;

  constructor() {
    console.log('Hello HomeComponent Component');
    this.text = 'Hello World';
  }

}
