import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Http} from '@angular/http';
import { Menu } from '../menu/menu';
import { MiPerfil } from '../mi-perfil/mi-perfil';

@Component({
  selector: 'page-estilo-propio',
  templateUrl: 'estilo-propio.html',
})
export class EstiloPropio {

colorsel;
  private usuarioLogueado;
  micolor;
  nombreimg;
  dir1;
  dir2;
  dir3;
  dir4;
  dirI1;
  dirI2;
  dirI3;
  dirI4;
  dirIB1;
  dirIB2;
  dirIB3;
  dirIB4;
  slides: Slides;
  nombreestilo;
  rutaFondo;
  rutaIcono;
  codigocolor;
  icono;
  portada;
 miidestilo;
 rootPage: any;
 listaColores=[
   "Rojo",
   "Azul",
   "Negro",
   "Rosa",
   "Verde",
   "Violeta",
   "Marron"
 ];
   private cargando = true;
  constructor(public http:Http, public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, public auth: servicioAuth) {
    this.usuarioLogueado = this.auth.getUserInfo();
        this.traerMiEstilo();
        console.info(this.usuarioLogueado['tipo_usuario']);
 
  }

 
guardarMiEstilo()
{
  //variables
    var miportada;
    var miicono;
    if(this.portada=="dir1"){miportada = "assets/img2/portada_1/";}
    if(this.portada=="dir2"){miportada = "assets/img2/portada_2/";}
    if(this.portada=="dir3"){miportada = "assets/img2/portada_3/";}
    if(this.portada=="dir4"){miportada = "assets/img2/portada_4/";}
    if(this.icono=="dirI1"){miicono = "assets/img2/iconos_1/";}
    if(this.icono=="dirI2"){miicono = "assets/img2/iconos_2/";}
    if(this.icono=="dirI3"){miicono = "assets/img2/iconos_3/";}
    if(this.icono=="dirI4"){miicono = "assets/img2/iconos_4/";}
  //finvariables

 this.http.post("http://tppps2.hol.es/ws1/usuarios/guardarmiestilo", {
            nombre:this.nombreestilo,
            rutaFondo:miportada,
            rutaIcono:miicono,
            codigocolor1:this.colorsel,
            id_usuario:this.usuarioLogueado['id_usuario']
                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                        console.info(quote);  
                        console.info(quote['nombre']); 
                        this.miidestilo=quote['nombre'];
                        console.info(this.miidestilo);
                        console.info(this.usuarioLogueado['id_usuario']);
                         console.info(this.nombreestilo);
                    });
                    console.info(this.nombreestilo);
    this.http.post("http://tppps2.hol.es/ws1/modificarestilo", {
            id_usuario:this.usuarioLogueado['id_usuario'],
            estilo:this.nombreestilo
                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                        console.info(quote);     
                        this.cerrar();
                    });


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
                        console.info(quote[0]['nombre']);   
                        
                        if(quote[0]['estilopropio'] != 0)
                        {
                          this.micolor=quote[0]['codigocolor1']; 
                        }else{
                          this.micolor=quote[0]['nombre']; 
                        }
                        console.info(this.usuarioLogueado['tipo_usuario']);
                        this.nombreimg="menu_"+this.usuarioLogueado['tipo_usuario']+".png";
                        console.info( this.nombreimg);
                        this.dir1="assets/img2/portada_1/"+this.nombreimg;
                        this.dir2="assets/img2/portada_2/"+this.nombreimg;
                        this.dir3="assets/img2/portada_3/"+this.nombreimg;
                        this.dir4="assets/img2/portada_4/"+this.nombreimg;
                        console.info(this.dir1);
                        console.info(this.dir2);
                        console.info(this.dir3);
                        console.info(this.dir4);
                        this.dirI1="assets/img2/iconos_1/nueva_pregunta.png";
                        this.dirI2="assets/img2/iconos_2/nueva_pregunta.png";
                        this.dirI3="assets/img2/iconos_3/nueva_pregunta.png";
                        this.dirI4="assets/img2/iconos_4/nueva_pregunta.png";

                        this.dirIB1="assets/img2/iconos_1/eliminar_encuesta.png";
                        this.dirIB2="assets/img2/iconos_2/eliminar_encuesta.png";
                        this.dirIB3="assets/img2/iconos_3/eliminar_encuesta.png";
                        this.dirIB4="assets/img2/iconos_4/eliminar_encuesta.png";
                        this.cargando = false;
                    });
                    
}

 
cerrar()
{
  console.info("cerrando");
  this.viewCtrl.dismiss();
}

}
