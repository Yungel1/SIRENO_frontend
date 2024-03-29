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
  hiddenCampana: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get('campana')){
      this.hiddenCampana = false;
      var newURL = location.href.split("?")[0];
      window.history.pushState('object', document.title, newURL);
    }
  }

  onRegister(){
    if(!this.hiddenRegister){
      this.hiddenRegister = true;
    } else{
      this.hiddenRegister = false;
      this.hiddenSituacion = true;
      this.hiddenCampana = true;
    }

  }
  onSituacion(){
    if(!this.hiddenSituacion){
      this.hiddenSituacion = true;
    } else{
      this.hiddenRegister = true;
      this.hiddenSituacion = false
      this.hiddenCampana = true;
    }
  }
  onCampana(){
    if(!this.hiddenCampana){
      this.hiddenCampana = true;
    } else{
      this.hiddenRegister = true;
      this.hiddenSituacion = true;
      this.hiddenCampana = false;
    }
  }
  

}
