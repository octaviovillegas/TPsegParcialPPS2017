import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Http} from '@angular/http'; 
import { EstiloPropio } from '../estilo-propio/estilo-propio';
 import { Menu } from '../menu/menu';
@Component({
  selector: 'page-mi-perfil',
  templateUrl: 'mi-perfil.html',
})
export class MiPerfil {


  private usuarioLogueado;
  micolor;
    private cargando = true;
    relationship="estiloDef";
    misEstilosCreados=[];
    estelg;

  constructor(public http:Http, public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController , public auth: servicioAuth) {
     this.usuarioLogueado = this.auth.getUserInfo();
        this.traerMiEstilo();

        this.traerMisEstilosPersonalizados();
  }


traerMiEstilo()
{
  this.cargando = true;
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
                            if(quote[0]['estilopropio'] != 0)
                                {
                                this.micolor=quote[0]['codigocolor1']; 
                                }else{
                                this.micolor=quote[0]['nombre']; 
                                } 
                          this.cargando = false;
                      });
                    
}

estilopropio()
{
   this.navCtrl.push(EstiloPropio, {
            direction: 'forward',
            animation: 'ios-transition'
        });
}

 onChange(event)
 {
   console.info(event); 
   
    this.http.post("http://tppps2.hol.es/ws1/modificarestilo", {
            id_usuario:this.usuarioLogueado['id_usuario'],
            estilo:event
                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                        console.info(quote);     
                        //this.micolor=event;    
                        this.traerMiEstilo();                  
                    });
                
 }

 
 traerMisEstilosPersonalizados()
 {
          this.http.post("http://tppps2.hol.es/ws1/TodosMisEstilos", {
            id_usuario:this.usuarioLogueado['id_usuario'],
                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                        console.info(quote);     
                        this.misEstilosCreados=quote;            
                    });
 } 

  cancelar()
  {
     this.viewCtrl.dismiss();
  }

  volver()
  {
    this.navCtrl.push(Menu);
  }
}
