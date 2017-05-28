import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
})

export class User {
    id_usuario: number;
  usuario: string;
  clave: string;
  tipo_usuario: string;

  constructor(id_usuario: number, usuario: string, clave: string, tipo_usuario:string) {
      this.id_usuario = id_usuario;
    this.usuario = usuario;
    this.clave = clave;
    this.tipo_usuario = tipo_usuario;
  }
}
