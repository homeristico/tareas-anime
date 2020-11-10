import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  tarea:any = {
    id:'',
    avatar:'',
    titulo:'',
    detalle:'',
    fecha:'',
    colorChip:''
  };

 
  constructor(private _navCon: NavController) { }

  ngOnInit() {
  }

  irHome(){
    this._navCon.navigateBack('/home');
  }

  guardar(){        
    
    let arregloTareas = JSON.parse(localStorage.getItem('tareas'));   

    if(arregloTareas === null){

      arregloTareas = [];
      this.tarea.id = 1;
      this.tarea.avatar = this.numeroAvatar();  
      this.tarea.fecha = this.fecha();      
      arregloTareas.push(this.tarea);
      localStorage.setItem('tareas',JSON.stringify(arregloTareas));          
      this._navCon.navigateBack('/home');

    }else if(arregloTareas.length === 0){

      this.tarea.id = 1;
      this.tarea.avatar = this.numeroAvatar();  
      this.tarea.fecha = this.fecha();
      arregloTareas.push(this.tarea);
      localStorage.setItem('tareas',JSON.stringify(arregloTareas));          
      this._navCon.navigateBack('/home');

    }else{      

      this.tarea.id = this.tareaId();
      this.tarea.avatar = this.numeroAvatar();
      this.tarea.fecha = this.fecha();
      arregloTareas.push(this.tarea);
      localStorage.setItem('tareas',JSON.stringify(arregloTareas));      
      this._navCon.navigateBack('/home');
    }
    
    
  }  

  numeroAvatar(){
    let num =  Math.floor(Math.random() * (35 - 1)) + 1;  
    return num.toString();  
  }

  tareaId(){
    let tareas = JSON.parse(localStorage.getItem('tareas'));      
    let tarea = tareas[tareas.length - 1];
    return tarea.id + 1;
  }

  fecha(){
    var hoy = new Date();   
    let hoyString = hoy.toString()
    return hoyString.substring(0,25);
  }
  

}
