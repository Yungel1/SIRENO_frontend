import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = "";
  contrasena: string = "";

  constructor(private usuarioService: UsuarioService,private router: Router) {  }

  ngOnInit(): void {
  }

  login(): void {
    this.usuarioService.login(this.usuario,this.contrasena).subscribe({ 
      next: (data) => {
        this.usuarioService.setToken(data.token);
        this.router.navigate(['/']);
      },
      error: (e) => {
        alert(e.error.message);
      }
    });
  }

}
