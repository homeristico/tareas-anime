import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  tarea:any;

  constructor(private _navCon: NavController, private _route:ActivatedRoute){
    this.obtenerTarea();
   }

  ngOnInit() {
  }

  obtenerTarea(){
    this.tarea = JSON.parse(this._route.snapshot.paramMap.get('tarea'));
    console.log(this.tarea)
  }

  irHome(){    
    this._navCon.navigateBack('/home');
  }

}
