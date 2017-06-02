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
  
  comisi:number;
  comisiones;

  constructor(public navCtrl: NavController, public navParams: NavParams, htt:Http, public viewCtrl: ViewController)
  {
    this.d= navParams.data['descripcion'];
    this.comisi=navParams.data['comision'];
    this.id_curso=navParams.data['id_curso'];
    this.http=htt;
    this.TraerComisiones();
    
    
  }

  onChange(event)
  {
    console.info(event);
    console.info(this.comisi);
  }

  Modificar(des_curso,com_des,usuario)
  {
    let micomi;
    usuario=1;
    for(let comi of this.comisiones)
    {
      if(comi.descripcion==com_des)
      {
        micomi=comi.id_comision;
      }
    }
    console.info("curso_id:",this.id_curso);
    console.info("comision:",micomi);
    console.info("desc_curso:",des_curso);
    console.info("idusuario:",usuario);

      this.http.post("http://tppps2.hol.es/ws1/cursos/modificar", {
           id_curso:this.id_curso,
           id_comision:micomi,
           descripcion:des_curso,
           id_usuario:usuario
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



  Cancelar()
  {
      this.viewCtrl.dismiss();
  }
 
}
