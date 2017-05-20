import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
})

export class User {
  usuario: string;
  clave: string;
  tipo_usuario: string;

  constructor(usuario: string, clave: string, tipo_usuario:string) {
    this.usuario = usuario;
    this.clave = clave;
    this.tipo_usuario = tipo_usuario;
  }
}
