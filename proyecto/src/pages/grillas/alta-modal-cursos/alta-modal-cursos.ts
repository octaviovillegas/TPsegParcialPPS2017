import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavOptions, ViewController} from 'ionic-angular';
import {Http, URLSearchParams} from '@angular/http';
/**
 * Generated class for the ModificacionModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-alta-modal-cursos',
  templateUrl: 'alta-modal-cursos.html',
})
export class AltaModalCursos 
{

      d;
  id_curso;
  http;
  desc_comi
  comisiones;
  id_comi;
  profesores;
  UssP=[];
  profe;


      constructor(public navCtrl: NavController, public navParams: NavParams, htt:Http ,public viewCtrl: ViewController) 
      {
        this.http=htt;
       this.TraerComisiones();
       this.TraerProfesores();
      }

      Alta(descCurso, id_comi, prof)
      {
            console.info("id_profesor:",prof);
            console.info("id_comision:",id_comi);
            console.info("descripcioncurso:",descCurso);
               this.http.post("http://tppps2.hol.es/ws1/cursos/alta", {
              id_comision: id_comi,
              id_usuario: prof,
              descripcion: descCurso
          })
          .map(res => res.json())
          .subscribe((quote) =>{
            console.info(quote);
            this.viewCtrl.dismiss();
          });
        

      }


      TraerProfesores()
      {
          this.profesores=null;
          this.UssP=[];
            this.http.get("http://tppps2.hol.es/ws1/usuarios")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.profesores = quote;

            for(let us of this.profesores)
              {
                if(us['tipo_usuario'] == "Profesor")
                {
                  this.UssP.push(us);
                }
              }
              console.info(this.UssP);

            });

      }
      
        
      TraerComisiones(){
        console.info("entro");
                
                  this.http.get("http://tppps2.hol.es/ws1/comisiones")
                  .map(res => res.json())
                  .subscribe((quote) =>{
                        this.comisiones = quote; 
                        console.info(this.comisiones);                     
                  });
                   
      }


      
      cancelar()
      {
          this.viewCtrl.dismiss();
      }


  }
