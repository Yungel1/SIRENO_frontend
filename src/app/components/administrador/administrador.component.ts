import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  hidden: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    if (this.hidden){
      this.hidden = false;
    } else{
      this.hidden = true;
    }
    //this.router.navigate(['/'+tipo]);
  }

}
