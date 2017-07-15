import { Component } from '@angular/core';
import {  NavController, NavParams,MenuController } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Http} from '@angular/http';

@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class Administrador {

 micolor;
 ngestilo;
 rutafondo;
  private usuarioLogueado;
  rutaico;
  constructor(public navCtrl: NavController, public navParams: NavParams,
      menu: MenuController, private auth: servicioAuth,public http:Http) {
     
    this.usuarioLogueado = this.auth.getUserInfo();
     this.traerMiEstilo();
  }

traerMiEstilo()
{
  console.info(this.usuarioLogueado['id_usuario']);
  console.info(event);
   this.http.post("http://tppps2.hol.es/ws1/traerConfMiEstilo", {
            id_usuario:this.usuarioLogueado['id_usuario']
                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                        console.info(quote);  
                        console.info(quote['estilo']);     
                        console.info(quote['nombre']);   
                        console.info(quote[0]['nombre']);   
                           if(quote[0]['nombre'] != "estilo1" && quote[0]['nombre'] != "estilo2" && quote[0]['nombre'] != "estilo3" && quote[0]['nombre'] != "estilo4")
                                {
                                this.micolor=quote[0]['codigocolor1']; 
                                }else{
                                this.micolor=quote[0]['nombre']; 
                                } 
                        this.rutafondo=quote[0]['rutaFondo'];
                        this.rutaico=quote[0]['rutaIcono'];
                         this.ngestilo = {
                          'background-image': 'url(' +this.rutafondo+'menu_Administrador.png)',
                          'background-size':' 400px 700px'
  };
                    });
                    
}


}
