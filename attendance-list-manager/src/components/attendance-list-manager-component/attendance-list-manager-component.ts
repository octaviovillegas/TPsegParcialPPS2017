import { Component } from '@angular/core';

/**
 * Generated class for the AttendanceListManagerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'attendance-list-manager-component',
  templateUrl: 'attendance-list-manager-component.html'
})
export class AttendanceListManagerComponent {

  text: string;

  constructor() {
    console.log('Hello AttendanceListManagerComponent Component');
    this.text = 'Estás viendo el contenido del componente AttendanceListManager';
  }

}
