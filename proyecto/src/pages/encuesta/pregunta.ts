import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: '',
})

export class Pregunta {
    id_encuesta: number;
    id_pregunta: number;
    opcion1: string;
    opcion2: string;
    opcion3: string;
    opcion4: string;
    pregunta: string;
    tipo: string;
    respuesta_opcion: any;
 micolor;
  constructor(id_encuesta: number, id_pregunta: number, opcion1: string,
            opcion2: string, opcion3: string,
            opcion4: string, pregunta: string, tipo: string, respuesta_opcion: any) {
      this.id_encuesta = id_encuesta;
      this.id_pregunta = id_pregunta;
      this.opcion1 = opcion1;
      this.opcion2 = opcion2;
      this.opcion3 = opcion3;
      this.opcion4 = opcion4;
      this.pregunta = pregunta;
      this.tipo = tipo;
      this.respuesta_opcion = respuesta_opcion;
  }
}
