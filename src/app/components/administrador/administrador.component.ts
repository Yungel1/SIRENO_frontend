import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  hiddenRegister: boolean = true;
  hiddenSituacion: boolean = true;
  hiddenCampana: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(){

    this.hiddenRegister = false;
    this.hiddenSituacion = true
    this.hiddenCampana = true;
  }
  onSituacion(){
    this.hiddenRegister = true;
    this.hiddenSituacion = false
    this.hiddenCampana = true;
  }
  onCampana(){
    this.hiddenRegister = true;
    this.hiddenSituacion = true
    this.hiddenCampana = false;
  }
  

}
