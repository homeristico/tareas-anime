import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  arregloTareas:any = [];
  colorChip:string = '';

  constructor(private _navCon: NavController, private _alert:AlertController){
    this.cargarTareas();
  }

  ionViewWillEnter(){
    this.cargarTareas();
  }

  cargarTareas(){
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    if(tareas !== null){
      this.arregloTareas = tareas.reverse();    
    }    
  }

  irAgregar(){
    this._navCon.navigateForward('/agregar');
  }

  irDetalles(tarea){    
    this._navCon.navigateForward('/editar/'+tarea.id);
  }

  async verCompleto(tarea){
    const alert = await this._alert.create({
      cssClass: 'my-custom-class',
      header: `Titulo: ${tarea.titulo}`,
      subHeader: 'Detalles:',
      message: tarea.detalle,
      buttons: ['OK']
    });

    await alert.present();
  }

  cambiarColor(tarea){
        
    switch (tarea.colorChip){
      case '':        
        this.actualizarColor(tarea,'aqua');
        break;
      case 'aqua':
        this.actualizarColor(tarea,'deeppink');
        break;
      default:
        this.actualizarColor(tarea,'');
        
    }       
  }

  actualizarColor(tarea,color){
    let arreglo = JSON.parse(localStorage.getItem('tareas'));
    arreglo.map(rs => rs.id === tarea.id ? rs.colorChip =  color : tarea.colorChip =  '');
    localStorage.setItem('tareas',JSON.stringify(arreglo));
    this.cargarTareas();
  }

}
