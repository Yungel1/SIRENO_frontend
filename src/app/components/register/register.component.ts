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

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.usuarioService.register(this.email,this.usuario,this.contrasena).subscribe( data => {
      console.log(data);
    });
  }

}
