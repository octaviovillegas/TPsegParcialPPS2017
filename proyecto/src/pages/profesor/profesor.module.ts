import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Profesor } from './profesor';

@NgModule({
  declarations: [
    Profesor,
  ],
  imports: [
    IonicModule.forChild(Profesor),
  ],
  exports: [
    Profesor
  ]
})
export class ProfesorModule {}
