import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  roles: string[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.usuarioService.getUsuarioInfo().subscribe(usuario => {
      JSON.stringify(usuario)
      if(){

      }
      this.roles = response;
    });
  }

}
