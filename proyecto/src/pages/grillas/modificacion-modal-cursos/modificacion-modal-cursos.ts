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
  desc_comi

  comisiones;

  constructor(public navCtrl: NavController, public navParams: NavParams, htt:Http, public viewCtrl: ViewController)
  {
    this.d = navParams.data['descripcion'];
    this.desc_comi=navParams.data['comision'];
    console.info(navParams.data['comision']);
    this.id_curso=navParams.data['id_curso'];
    this.http=htt;
    this.TraerComisiones();
    
    
  }

  Modificar(id_usuario, nombre, usuario, clave, id_tipo)
  {
      this.http.post("http://tppps2.hol.es/ws1/usuarios/modificar", {
          id_usuario: id_usuario,
          clave: clave,
          nombre: nombre,
          usuario: usuario,
          id_tipo: id_tipo
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
                   console.info(this.desc_comi);
                     

            });
}



  Cancelar()
  {
      this.viewCtrl.dismiss();
  }
 
}
