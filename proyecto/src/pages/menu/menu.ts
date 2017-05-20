import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Alumno} from "../alumno/alumno";
import {Administrativo} from '../administrativo/administrativo';
import {Administrador} from '../administrador/administrador';
import {Profesor} from '../profesor/profesor';
/**
* Generated class for the Menu page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class Menu {
    private rootPage;
    private administrativoPage;
    private alumnoPage;
    private administradorPage;
    private profesorPage;
    private usuarioLogueado;

    constructor(public navCtrl: NavController, public navParams: NavParams) {


        this.usuarioLogueado = navParams.data;
        console.log('this.usuario');
        console.log(this.usuarioLogueado);

        this.administrativoPage = Administrativo;
        this.alumnoPage = Alumno;
        this.administradorPage = Administrador;
        this.profesorPage = Profesor;

        this.openPage(Alumno)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Menu');
    }

    openPage(p) {
        this.rootPage = p;
    }

    /**
     * Funcion para cerrar la sesion del usuario
     * @return void
     */
    cerrarSesion() {}

}
