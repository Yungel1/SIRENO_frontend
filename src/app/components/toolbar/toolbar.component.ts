import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.usuarioService.deleteToken();
    this.router.navigate(['/login']);
  }

  onHome(): void {
    this.router.navigate(['/']);
  }

}
