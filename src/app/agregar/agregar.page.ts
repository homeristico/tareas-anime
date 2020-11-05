import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  constructor(private _navCon: NavController) { }

  ngOnInit() {
  }

  irHome(){
    this._navCon.navigateBack('/home');
  }

}
