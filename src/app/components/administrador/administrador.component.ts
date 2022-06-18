import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  hiddenRegister: boolean = true;
  hiddenSituation: boolean = true;
  hiddenGroup: boolean = true;
  hiddenGrade: boolean = true;
  hiddenCourse: boolean = true;
  hiddenEncuesta: boolean = true;
  hiddenPregunta: boolean = true;
  hiddenOpcPregunta: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(){
    if (this.hiddenRegister){
      this.hiddenRegister = false;
    } else{
      this.hiddenRegister = true;
    }
  }

  onSituacion(){
    if (this.hiddenSituation){
      this.hiddenSituation = false;
    } else{
      this.hiddenSituation = true;
    }
  }
  onGrupo(){
    if (this.hiddenGroup){
      this.hiddenGroup = false;
    } else{
      this.hiddenGroup = true;
    }
  }
  onGrado(){
    if (this.hiddenGrade){
      this.hiddenGrade = false;
    } else{
      this.hiddenGrade = true;
    }
  }
  onAsignatura(){
    if (this.hiddenCourse){
      this.hiddenCourse = false;
    } else{
      this.hiddenCourse = true;
    }
  }
  onEncuesta(){
    if (this.hiddenEncuesta){
      this.hiddenEncuesta = false;
    } else{
      this.hiddenEncuesta = true;
    }
  }
  onPregunta(){
    if (this.hiddenPregunta){
      this.hiddenPregunta = false;
    } else{
      this.hiddenPregunta = true;
    }
  }
  onOpcPregunta(){
    if (this.hiddenOpcPregunta){
      this.hiddenOpcPregunta = false;
    } else{
      this.hiddenOpcPregunta = true;
    }
  }

}
