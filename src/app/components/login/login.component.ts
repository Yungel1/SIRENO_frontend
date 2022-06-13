import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = "";
  contrasena: string = "";

  constructor(private usuarioService: UsuarioService) {  }

  ngOnInit(): void {
  }

  login(): void {
    this.usuarioService.login(this.usuario,this.contrasena).subscribe( data => {
      this.usuarioService.setToken(data.token);
    });
  }

}
