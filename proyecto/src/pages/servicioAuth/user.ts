import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
})

export class User {
  usuario: string;
  clave: string;
 
  constructor(usuario: string, clave: string) {
    this.usuario = usuario;
    this.clave = clave;
  }
}
 