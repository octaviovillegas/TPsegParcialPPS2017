import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Usuario } from './usuario';

@NgModule({
  declarations: [
    Usuario,
  ],
  imports: [
    IonicPageModule.forChild(Usuario),
  ],
  exports: [
    Usuario
  ]
})
export class UsuarioModule {}
