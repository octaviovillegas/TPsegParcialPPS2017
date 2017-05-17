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
    this.http.get("http://localhost/ws1/usuarios")
  .map(res => res.json())
  .subscribe((quote) =>{
    this.ListaUsuarios = quote;
  });
}


  public login(credenciales) {
   let access =false;
    if (credenciales.usuario === null || credenciales.clave === null) {
      return Observable.throw("Por favor inserte las credenciales");
    } else {
      return Observable.create(observer => {
         for (let entry of this.ListaUsuarios) {
           console.log(credenciales);
          if(credenciales.usuario == entry["usuario"] && credenciales.clave == entry["clave"] )
            access = true;
                }
        console.info(access);
        this.currentUser = new User(credenciales.usuario, credenciales.clave);
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