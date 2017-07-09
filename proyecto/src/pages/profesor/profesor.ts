import { Component } from '@angular/core';
import 'rxjs/Rx';
import { NavController,ViewController,NavParams,ModalController } from 'ionic-angular';
import {Encuestas} from '../encuestas/encuestas';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Http} from '@angular/http'; 

@Component({
  selector: 'page-Profesor',
  templateUrl: 'profesor.html',
  providers: [ModalController]
})
export class Profesor {

 private  usuarioLogueado;
 micolor;
 cargando = true;
 rutafondo;
 rutaico;
 ngestilo;
 


 constructor(public http:Http, public navCtrl: NavController,public viewCtrl:ViewController,public NavParams: NavParams,
 public modalCtrl: ModalController,servAuth:servicioAuth) {
  this.usuarioLogueado=servAuth.getUserInfo();
       this.traerMiEstilo();
 
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
                             console.info(this.micolor);
                          }else{
                            this.micolor=quote[0]['nombre']; 
                            console.info("nom");
                          }
                          this.rutafondo=quote[0]['rutaFondo'];
                          this.rutaico=quote[0]['rutaIcono'];
                         
                          this.ngestilo = {
                          'background-image': 'url(' +this.rutafondo+'menu_Profesor.png)',
                          'background-size':' 400px 700px'
                          };  
                          this.cargando = false;
                          console.info(this.rutafondo);
                          console.info(this.ngestilo);
                          
                         
                      });

                    
}


}
