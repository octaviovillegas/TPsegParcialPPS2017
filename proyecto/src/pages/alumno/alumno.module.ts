import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Alumno } from './alumno';

@NgModule({
  declarations: [
    Alumno,
  ],
  imports: [
    IonicModule.forChild(Alumno),
  ],
  exports: [
    Alumno
  ]
})
export class AlumnoModule {}
