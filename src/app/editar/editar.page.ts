import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  tarea:any;  
  editar:boolean = true;   
  mostrar:boolean = true; 
  hora:any = '';

  constructor(private _navCon: NavController, private _route: ActivatedRoute,
              private _alert: AlertController, private localNotifications: LocalNotifications,
              private _toast: ToastController)
   {
    this.obtenerTarea();
    this.horaActual();
   }

  ngOnInit(){
  }

  obtenerTarea(){
    let id = parseInt(this._route.snapshot.paramMap.get('tarea'));
    let arreglo = JSON.parse(localStorage.getItem('tareas'));
    let obj = arreglo.find(rs => rs.id === id);
    this.tarea = obj;
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

  cambiarNotificar(){
        console.log('mostrar date')
        this.mostrar = false;
  }

  crearNotificacion($event){     
    
    let fecha = $event.target.value;
    let fechaObj = this.conversionFecha(fecha);           

     // Schedule delayed notification
    this.localNotifications.schedule({
      id: this.tarea.id,
      title: this.tarea.titulo,
      text: this.tarea.detalle,      
      trigger: { at: new Date(fechaObj.ano, (fechaObj.mes-1), fechaObj.dia, fechaObj.hora, fechaObj.minuto) },
      led: 'FF0000',
      smallIcon: 'res://ic_stat_notify.png',
      icon: 'res://icon.png',      
      sound: null
    });
    this.mostrar = true;   
    this.mostrarToast(fechaObj);
  }

  conversionFecha(fecha){
    let ano =  parseInt(fecha.substring(0,4));   
    let mes = parseInt(fecha.substring(5,7));
    let dia = parseInt(fecha.substring(8,10));
    let hora = parseInt(fecha.substring(11,13));
    let minuto = parseInt(fecha.substring(14,16));
    return {
      ano:ano,
      mes:mes,
      dia:dia,
      hora:hora,
      minuto:minuto
    };
  }

  async mostrarToast(fechaObj){
    let mensaje = fechaObj.dia+'/'+fechaObj.mes+'/'+fechaObj.ano+'  '+fechaObj.hora+':'+fechaObj.minuto;
    const toast = await this._toast.create({
      message: 'la alarma sonara en: <br>'+mensaje,
      duration: 4000
    });
    toast.present();
  }

  horaActual(){
    this.hora = new Date();    
  }

}
