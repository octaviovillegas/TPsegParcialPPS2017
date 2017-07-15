import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Http} from '@angular/http'; 
/**
* Generated class for the AcercaDePage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@Component({
    selector: 'page-acerca-de-page',
    templateUrl: 'acerca-de-page.html',
})
export class AcercaDePage {

    private device: Device;
    private usuarioLogueado;
    micolor;
    private cargando = true;

    constructor(public auth:servicioAuth ,public http:Http , public navCtrl: NavController, public navParams: NavParams, private dev: Device) {
        this.device = dev;
         this.usuarioLogueado = this.auth.getUserInfo();
        this.traerMiEstilo();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AcercaDePage');
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
                             if(quote[0]['nombre'] != "estilo1" && quote[0]['nombre'] != "estilo2" && quote[0]['nombre'] != "estilo3" && quote[0]['nombre'] != "estilo4")
                                {
                                this.micolor=quote[0]['codigocolor1']; 
                                }else{
                                this.micolor=quote[0]['nombre']; 
                                }
                            this.cargando = false;
                        });
                        
    }
}
