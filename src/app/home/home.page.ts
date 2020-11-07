import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  arregloTareas:any = [];

  constructor(private _navCon: NavController){
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
    this._navCon.navigateForward('/editar/'+JSON.stringify(tarea));
  }

}
