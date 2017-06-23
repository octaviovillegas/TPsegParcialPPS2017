import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController  } from 'ionic-angular';
import {Http} from '@angular/http';
import { ModificacionModalCursos } from '../modificacion-modal-cursos/modificacion-modal-cursos';
import { ModalController } from 'ionic-angular';
import { Menu } from '../../menu/menu';
import { servicioAuth } from '../../servicioAuth/servicioAuth';
import { AltaModal } from '../alta-modal/alta-modal';
import { AltaModalCursos } from '../alta-modal-cursos/alta-modal-cursos';
import { ActionSheetController } from 'ionic-angular';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-grilla-curso',
  templateUrl: 'grilla-curso.html',
})
export class GrillaCurso {

    cargando = false;

    Cursos;
    Cur : Array<any> =[];
    comisiones;
    profesores=null;
    UssP=[];
    archivo;
    aGuardar: Array<any> =[];
  constructor(public file: File, private alertCtrl: AlertController, public navCtrl: NavController, public auth: servicioAuth ,public navParams: NavParams, public viewCtrl: ViewController,
      private http: Http, public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController) {
         this.archivo=file;
        this.cargarProfesoresYGrilla();
  }

  cargarProfesoresYGrilla() {
      this.cargando = true;

      this.CargarProfesores().subscribe((usuarios) => {
          this.profesores = usuarios.filter((p) => p.tipo_usuario == 'Profesor');

          this.CargaGrilla();
      }, e => {
          this.mostrarMensaje('Hubo un error. Intente recargar la pagina.');
          this.cargando = false;
      });

  }

  CargarProfesores()
  {
      return this.http.get("http://tppps2.hol.es/ws1/usuarios")
      .map(res => res.json());
  }


      CargaGrilla()
      {
          this.cargando = true;
          console.info("CargaGrilla");
          this.Cursos=null;
          this.Cur=[];
          this.http.get("http://tppps2.hol.es/ws1/cursos")
          .map(res => res.json())
          .subscribe((cursos) =>{
              this.cargando = false;
              this.Cursos = cursos;

              for (let c of this.Cursos) {
                  c.profesor = this.profesores.find((p) => p.id_usuario == c.id_usuario);
              }
              console.log(this.Cursos);

          }, e => {
              this.cargando = false;
          });

      }
    
      GuardarFile()
        {
            for(let c of this.Cursos)
            {
                this.aGuardar.push({curso : c['descripcion'] , Comision: c['comision_descripcion'] , Profesor: c['profesor']['nombre']});
            }
            console.info(this.aGuardar);
            console.info(this.Cursos);
             console.info(this.archivo.externalDataDirectory);
              this.archivo.writeExistingFile(this.archivo.externalDataDirectory,"cursos.txt", this.aGuardar)
                .then(_ => alert("Se guardo correctamente!"))
                .catch(
                err => alert("Error al guardar!")           
                );
            

         
        }


    Modificar(id_curso, descripcion, comision,id_usuario)
    {
      console.info(id_curso, descripcion, comision,id_usuario);

        let curs = {
            id_curso: id_curso,
            comision: comision,
            descripcion: descripcion,
            id_usuario:id_usuario

        };
        let modal = this.modalCtrl.create(ModificacionModalCursos, curs);
        modal.onDidDismiss(data => {
            if (data) {
                this.CargaGrilla();
                this.mostrarMensaje('Curso modificado con éxito!');
            }
        });
        modal.present();

    }

    Alta()
    {

        let modal = this.modalCtrl.create(AltaModalCursos);
        modal.onDidDismiss(data => {
            if (data) {
                this.CargaGrilla();
                this.mostrarMensaje('Curso creado con éxito!');
            }
        });
        modal.present();

    }

    Eliminar(id_curso, desc_curso)
    {
      console.info(desc_curso);
              let alert = this.alertCtrl.create({
              title: 'Eliminacion de Curso',
              message: 'Confirma eliminar Curso: '+ desc_curso,
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancelar clicked');
                  }
                },
                {
                  text: 'Aceptar',
                  handler: () => {
                    console.log('Aceptar clicked');
                    this.cargando = true;
                    this.http.post("http://tppps2.hol.es/ws1/cursos/eliminar", {
                           id_curso: id_curso

                    })
                    .map(res => res.json())
                    .subscribe((quote) =>{
                        this.cargando = false;
                           this.CargaGrilla();
                    }, e => {
                        this.cargando = false;
                    });

                  }
                }
              ]
            });
            alert.present();

    }

    abrirActionSheet (c) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Opciones',
            buttons: [
                {
                    text: 'Editar',
                    handler: () => {
                        this.Modificar(c.id_curso, c.descripcion, c.comision_descripcion, c.id_usuario);
                    }
                },
                {
                    text: 'Eliminar',
                    role: 'destructive',
                    handler: () => {
                        this.Eliminar(c.id_curso, c.descripcion);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });

        actionSheet.present();
    }

    mostrarMensaje (mensaje) {
        let toast = this.toastCtrl.create({
            message: mensaje,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }


}
