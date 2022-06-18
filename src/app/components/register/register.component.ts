import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  usuario: string = "";
  contrasena: string = "";
  estudiante: boolean = false;
  docente: boolean = false;
  administrador: boolean = false;
  idDepartamento: string = "";
  isDisabled: boolean = true;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  cambioCheckBox(){
    
    this.isDisabled = !this.isDisabled;

  }

  convertir0o1(valor: boolean): string{
    
    if(valor==true){
      return '1';
    }
    return '0';

  }

  register(): void {
    
    let estudiante;
    let administrador;
    let docente;

    estudiante = this.convertir0o1(this.estudiante);
    administrador = this.convertir0o1(this.administrador);
    docente = this.convertir0o1(this.docente);

    this.usuarioService.register(this.email,this.usuario,this.contrasena,estudiante,docente,administrador,this.idDepartamento).subscribe( data => {
      console.log(data);
    });
  }

}
