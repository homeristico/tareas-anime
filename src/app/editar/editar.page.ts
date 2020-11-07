import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  tarea:any;  
  editar:boolean = true;  

  constructor(private _navCon: NavController, private _route: ActivatedRoute, private _alert: AlertController)
   {
    this.obtenerTarea();
   }

  ngOnInit(){
  }

  obtenerTarea(){
    this.tarea = JSON.parse(this._route.snapshot.paramMap.get('tarea'));    
  }

  irHome(){    
    this._navCon.navigateBack('/home');
  }

  cambioEditar(){
    this.editar = false;
  }

  guardarEditar(){
    let arreglo = JSON.parse(localStorage.getItem('tareas'));
    let obj = arreglo.map(res => res.id === this.tarea.id ? this.tarea : res); 
    localStorage.setItem('tareas',JSON.stringify(obj));
    this.editar = true;          
  }

  eliminarTarea(id){    
    let arreglo = JSON.parse(localStorage.getItem('tareas'));
    let eliminado = arreglo.filter(res => res.id !== id);
    localStorage.setItem('tareas',JSON.stringify(eliminado));
    this._navCon.navigateBack('/home');    
  }

  async mostrarAlert(tarea){
    const alert = await this._alert.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: `<img src="assets/imagenes/delete.gif">  Desea eliminar la tarea: <br><strong>${tarea.titulo}</strong>!!!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancelo.');
          }
        }, {
          text: 'Okay',
          handler: () => {            
            this.eliminarTarea(tarea.id);
          }
        }
      ]
    });

    await alert.present();
  }

  cancelarEditar(){
    this.editar = true;
    let arreglo = JSON.parse(localStorage.getItem('tareas'));    
    let obj = arreglo.find(rs => rs.id === this.tarea.id);
    this.tarea = obj;    
  }

}
