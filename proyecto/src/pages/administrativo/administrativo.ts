import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Http} from '@angular/http';
/**
 * Generated class for the Administrativo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-administrativo',
  templateUrl: 'administrativo.html',
})
export class Administrativo {

  usuarioLogueado;
  Usuarios=[];
  UssAl=[];
  Cursos=[];
  Cur=[];
  micolor;
  micolor2;
  cargando = true;
  rutafondo;
  rutaico;
  ngestilo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private auth: servicioAuth) {
     console.info(this.cargando);
      this.usuarioLogueado = this.auth.getUserInfo();
      console.info(this.usuarioLogueado);
      this.traerAlumnos();
      this.traerCusos();
     this.traerMiEstilo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Administrativo');

    
  }

traerMiEstilo()
{
  console.info(this.cargando);
  console.info(this.usuarioLogueado['id_usuario']);
  this.cargando = true;
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
                          console.info("entra aca codcolor");
                          this.micolor=quote[0]['codigocolor1']; 
                        }else{
                          this.micolor=quote[0]['nombre']; 
                            console.info("entra aca nombre");
                        }
                          this.rutafondo=quote[0]['rutaFondo'];
                          this.rutaico=quote[0]['rutaIcono'];
                         
                          this.ngestilo = {
                          'background-image': 'url(' +this.rutafondo+'menu_Administrativo.png)',
                          'background-size':' 400px 700px'
                          };  
                         this.cargando = false;
                    });
                    
}
  
  traerAlumnos()
  {
            console.info("entro");
          this.Usuarios=null;
          this.UssAl=[];
            this.http.get("http://tppps2.hol.es/ws1/usuarios")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.Usuarios = quote;

            for(let us of this.Usuarios)
              {
                if(us['tipo_usuario'] == "Alumno")
                {
                  this.UssAl.push(us);
                }
              }

            });

  }

  traerCusos()
  {
        this.Cursos=null;
          this.Cur=[];
            this.http.get("http://tppps2.hol.es/ws1/cursos")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.Cursos = quote;

            for(let us of this.Cursos)
              {
                    this.Cur.push(us); 
              }

            });
  }

}
