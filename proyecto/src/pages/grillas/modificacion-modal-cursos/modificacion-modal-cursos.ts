import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, NavOptions, ViewController} from 'ionic-angular';
import {Http, URLSearchParams} from '@angular/http';
import { servicioAuth } from '../../servicioAuth/servicioAuth';

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
 
  profesores;
  UssP;
  comisi:number;
  comisiones;
  profe_id;
  profe;
  cargando = true;
   micolor;
   private usuarioLogueado;
  constructor(public auth: servicioAuth, public navCtrl: NavController, public navParams: NavParams, public http:Http, public viewCtrl: ViewController)
  {
    this.d= navParams.data['descripcion'];
    this.comisi=navParams.data['comision'];
    this.id_curso=navParams.data['id_curso'];
    this.profe_id=navParams.data['id_usuario'];
    console.info(this.profe_id);
 

     
    this.cargando = true;
    this.CargarProfesores().subscribe((usuarios) => {

        this.profesores = usuarios.filter((p) => p.tipo_usuario == 'Profesor');
        this.UssP = this.profesores;
        this.profe = this.profesores.find((p) => p.id_usuario == this.profe_id).nombre;

        this.TraerComisiones();
        console.info(this.UssP);
        console.info(this.profe);

    });

    console.info(this.profe);
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
        this.viewCtrl.dismiss(true);
      });


  }


  CargarProfesores()
  {
      this.UssP=[];
      return this.http.get("http://tppps2.hol.es/ws1/usuarios")
      .map(res => res.json());
  }


  TraerComisiones(){
      console.info("entro");
      this.cargando = true;

      this.http.get("http://tppps2.hol.es/ws1/comisiones")
      .map(res => res.json())
      .subscribe((quote) =>{
          this.cargando = false;
          this.comisiones = quote;
          console.info(this.comisiones);
      }, e => {
          this.cargando = false;
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
      this.viewCtrl.dismiss(false);
  }

}
