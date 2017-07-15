import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Datos } from '../datos/datos';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  myColor: string = "Rojo";
  myFont: string = "Boogaloo";
  myIcon1: string = "ios-baseball";
  myIcon2= "ios-brush";
  myIcon3="ios-bulb";
  myIcon4="ios-call";
  mifondo:string="fondo2";
  fondo1="assets/1.png";
  fondo2="assets/2.png";
  fondo3="assets/3.png";
  UnEstilo; 
  letras=["Boogaloo","Pacifico","Righteous","Lobster Two"];
  TipoIcono="ios";
  ngestilo = {
                          'background-image': 'url(' + this.fondo2 +')',
                          'background-size':'auto',
                          
  };
 
  Icono1="assets/editar1.png";
  Icono2="assets/editar2.png";
  Icono3="assets/editar3.png";
  iconofoto=this.Icono1;
  constructor(public navCtrl: NavController,public dato:Datos) {
   dato.SetMiFondo(this.ngestilo);
   dato.SetMyColor(this.myColor);
  }

onChangeTipo(){
  if(this.TipoIcono=="ios")
  {
      this.myIcon1="ios-baseball";
      this.myIcon2="ios-brush";
      this.myIcon3="ios-bulb";    
      this.myIcon4="ios-call";
    
  }
  if(this.TipoIcono=="ioso")
  {
      this.myIcon1="ios-baseball-outline";
      this.myIcon2="ios-brush-outline";
      this.myIcon3="ios-bulb-outline";
      this.myIcon4="ios-call-outline";
    
  }
  if(this.TipoIcono=="md")
  {
      this.myIcon1="md-baseball";
      this.myIcon2="md-brush";
      this.myIcon3="md-bulb";
      this.myIcon4="md-call";
    
  }
}


  onChangecolor()
  {
    this.dato.SetMyColor(this.myColor);
  }

  onChange(){
    console.info("letra: "+this.myFont);
    this.UnEstilo=this.myFont;
  }
  
  onChangefondo()
  {
    console.info(this.mifondo);
    if(this.mifondo == "fondo1"){
      console.info("entro al 1");
    this.ngestilo = {
                          'background-image': 'url(' + this.fondo1 +')',
                          'background-size':' auto'
      };
    }
    if(this.mifondo == "fondo2"){
      console.info("entro al 2");
       this.ngestilo = {
                          'background-image': 'url(' + this.fondo2 +')',
                          'background-size':' auto'
    };}
      if(this.mifondo == "fondo3"){
        console.info("entro al 3");
        this.ngestilo = {
                            'background-image': 'url(' + this.fondo3 +')',
                            'background-size':' auto'
    };
      }

      this.dato.SetMiFondo(this.ngestilo);
  }

}
