import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {User} from '../servicioAuth/user';
import 'rxjs/Rx';

 @Component({
  selector: 'page-contact',
  templateUrl: 'servicioAuth.html'
})

export class servicioAuth {

  currentUser: User;
ListaUsuarios = "";

constructor(private http: Http) {
    this.http.get("http://tppps2.hol.es/ws1/usuarios")
    //this.http.get("http://localhost/facultad/ws1/usuarios")
  .map(res => res.json())
  .subscribe((quote) =>{
    this.ListaUsuarios = quote;
    console.info(quote);
  });
}


  public login(credenciales) {
    console.info(credenciales);
   let access =false;
   let tipo ="";
    if (credenciales.usuario === null || credenciales.clave === null) {
      return Observable.throw("Por favor inserte las credenciales");
    } else {
      return Observable.create(observer => {
         for (let entry of this.ListaUsuarios) {
           console.info(entry);
          if(credenciales.usuario === entry["usuario"] && credenciales.clave === entry["clave"] ){
             access = true;
             tipo = entry["tipo_usuario"];
          }
                }
        this.currentUser = new User(credenciales.usuario, credenciales.clave,tipo);
        observer.next(access);
        observer.complete();
      });
    }
  }



  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
