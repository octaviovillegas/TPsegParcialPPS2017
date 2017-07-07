import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { servicioAuth } from '../servicioAuth/servicioAuth';
import {Http} from '@angular/http';
 
@Component({
  selector: 'alumno-curso',
  templateUrl: 'alumno-curso.html',
})
export class AlumnoCurso {

  usuarioLogueado;
  Usuarios=[];
  UssAl=[];
  Cursos=[];
  Cur=[];
  UnCurso;
  UnAlumno;
 micolor;
  private cargando = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private auth: servicioAuth) {
      this.usuarioLogueado = this.auth.getUserInfo();
      console.info(this.usuarioLogueado);
      this.traerAlumnos();
      this.traerCusos();
      this.traerMiEstilo()
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
  
  traerAlumnos()
  {
            console.info("entro");
          this.Usuarios=null;
          this.UssAl=[];
            this.http.get("http://tppps2.hol.es/ws1/usuarios")
            .map(res => res.json())
            .subscribe((quote) =>{
            this.Usuarios = quote;
            console.info(this.Usuarios);
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


            });
  }


  Alta()
  {
    console.info(this.UnCurso);
    console.info(this.UnAlumno);
    
      this.http.post("http://tppps2.hol.es/ws1/alumnoCurso/alta", {
             id_usuario:this.UnAlumno,
             id_curso: this.UnCurso
          })
          .map(res => res.json())
          .subscribe((quote) =>{
            console.info(quote);
           alert("Se dio de alta correctamente");  
          },
           err => {alert("Error: Ya se encuentra dado de alta en el curso");
          });
          this.UnCurso=null;
          this.UnAlumno=null;
  }

}
