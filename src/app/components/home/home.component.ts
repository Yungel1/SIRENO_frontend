import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Rol} from "../../models/rol.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  roles: Rol[] = [];
  selectedRol?: Rol;

  constructor(private usuarioService: UsuarioService,private router: Router) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.usuarioService.getUsuarioInfo().subscribe(usuario => {
      let usuarioJSON = JSON.parse(JSON.stringify(usuario));

      let rol: Rol;

      if(usuarioJSON["administrador"]){
        rol = {
          id: "administrador",
          nombre: "Administrador"
        }
        this.roles.push(rol);
      }
      if(usuarioJSON["estudiante"]){
        rol = {
          id: "estudiante",
          nombre: "Estudiante"
        }
        this.roles.push(rol);
      }
      if(usuarioJSON["docente"]){
        rol = {
          id: "docente",
          nombre: "Docente"
        }

        this.roles.push(rol);
      }
      if(this.roles.length==0){
        alert("No tienes ningún rol asignado, contacte con un administrador")
        this.router.navigate(['/login']);
      }
    });
  }

  onSelect(rol: Rol): void {
    this.selectedRol = rol;
    this.rolPagina();
  }

  rolPagina(): void {

    if(this.selectedRol!=null){
      if(this.selectedRol.id=="administrador"){
        this.router.navigate(['/administrador']);
      }
      if(this.selectedRol.id=="estudiante"){
        this.router.navigate(['/estudiante']);
      }
      if(this.selectedRol.id=="docente"){
        this.router.navigate(['/docente']);
      }
    }
  }

  onLogout(): void {
    this.usuarioService.deleteToken();
    this.router.navigate(['/login']);
  }

}
