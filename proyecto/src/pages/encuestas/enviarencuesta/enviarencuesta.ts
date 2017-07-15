import { Component } from '@angular/core';
import 'rxjs/Rx';
import { NavController,NavParams,ToastController } from 'ionic-angular';
import {Http} from '@angular/http';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { Toast } from '@ionic-native/toast';
import { NativeAudio } from '@ionic-native/native-audio';
import { Observable } from 'rxjs/Observable';
 

@Component({
    selector: 'page-enviarencuesta',
    templateUrl: 'enviarencuesta.html'
})
export class EnviarEncuesta {

    private listaEncuestas;
    private listaCursos;
    private cursoSeleccionado = 0;
    private encuestaSeleccionada = 0;
    private toast;
 micolor;
    private cargando = true;
usuarioLogueado;
    constructor( public auth: servicioAuth, public navCtrl: NavController,public NavParams: NavParams,private http: Http, servAuth:servicioAuth,private toastCtrl: ToastController,private nativeAudio: NativeAudio)
    {
        this.nativeAudio.preloadSimple('uniqueId1', '../assets/ingreso.mp3');

        

        let cursos = this.getCursos();
        let encuestas = this.getEncuestas();

        // envio los 2 request en paralelo.
        Observable.forkJoin([cursos, encuestas]).subscribe(results => {

            this.listaCursos = results[0];
            console.info(this.listaCursos);

            this.listaEncuestas = results[1];
            console.info(this.listaEncuestas);
 

        });

             this.usuarioLogueado = this.auth.getUserInfo();
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


    getCursos() {
        return this.http.get("http://tppps2.hol.es/ws1/cursos")
        .map(res => res.json());
    }

    getEncuestas() {
        return this.http.get("http://tppps2.hol.es/ws1/encuestas")
        .map(res => res.json());
    }

    verToast() {

        this.toast = this.toastCtrl.create({
            message: 'La encuesta se asignó al curso correctamente',
            duration: 3000,
            position: 'top'
        });

        this.toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
        this.toast.present();
    }

    EnviarEncuesta() {
        this.cargando = true;
        this.http.post("http://tppps2.hol.es/ws1/encuestas/enviar", {
            idEncuesta:this.encuestaSeleccionada,
            idCurso:this.cursoSeleccionado
        })
        .map(res => res.json())
        .subscribe((quote) =>{
            this.cargando = false;
            this.verToast();
            this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
            this.encuestaSeleccionada = 0;
            this.cursoSeleccionado = 0;
            console.info(quote);
        });


    }

}
