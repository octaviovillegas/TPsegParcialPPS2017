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
  selector: 'page-modificacion-modal-cursos',
  templateUrl: 'modificacion-modal-cursos.html',
})
export class ModificacionModalCursos
{

  d;
  id_curso;
  http;
  profesores;
  UssP;
  comisi:number;
  comisiones;
  profe_id;
  profe;
  constructor(public navCtrl: NavController, public navParams: NavParams, htt:Http, public viewCtrl: ViewController)
  {
    this.d= navParams.data['descripcion'];
    this.comisi=navParams.data['comision'];
    this.id_curso=navParams.data['id_curso'];
    this.profe_id=navParams.data['id_usuario'];
    console.info(this.profe_id);

    this.http=htt;
    this.TraerComisiones()
    this.TraerProfesores();
    console.info(this.profe);
  }

 

  Modificar(des_curso,com_des,usuario)
  {

    console.info(des_curso,com_des,usuario);
    let micomi;
    let miusu;

    for(let us of this.profesores)
    {
      if(us.nombre==usuario)
      {
        miusu=us.id_usuario;
      }
    }
    
    console.info(miusu);
    for(let comi of this.comisiones)
    {
      if(comi.descripcion==com_des)
      {
        micomi=comi.id_comision;
      }
    }

      this.http.post("http://tppps2.hol.es/ws1/cursos/modificar", {
           id_curso:this.id_curso,
           id_comision:micomi,
           descripcion:des_curso,
           id_usuario:miusu
      })
      .map(res => res.json())
      .subscribe((quote) =>{
        this.viewCtrl.dismiss();
      });
        
        
  }


TraerComisiones(){
            this.http.get("http://tppps2.hol.es/ws1/comisiones")
            .map(res => res.json())
            .subscribe((quote) =>{
                   this.comisiones = quote;  
                   console.info(this.comisiones);
                     

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
            console.info(this.profesores);
            for(let us of this.profesores)
              {
                if(us['tipo_usuario'] == "Profesor")
                {
                  this.UssP.push(us);
                }
                if(us['id_usuario']==this.profe_id)
                {
                  console.info(us['id_usuario']);
                  console.info(us['nombre']);
                  this.profe=us['nombre'];
                  console.info( this.profe);
                }
              }
               

            });
            
      }

  Cancelar()
  {
      this.viewCtrl.dismiss();
  }
 
}
