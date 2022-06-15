import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';
import {Encuesta} from "../../models/encuesta.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  encuestas: Encuesta[] = [];
  selectedEncuesta?: Encuesta;

  constructor(private encuestaService: EncuestaService,private router: Router) { }

  ngOnInit() {
    this.getEncuestaInfo();
  }

  getEncuestaInfo(): void {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idCampaña = urlParams.get('idcampana');

    if(idCampaña!=null){

      this.encuestaService.getEncuestaCampaña(idCampaña).subscribe(encuestaId => {
        let encuestaIdJSON = JSON.parse(JSON.stringify(encuestaId));
  
        let encuestaJSON;
        let encuestaInfo: Encuesta;
  
        encuestaIdJSON.forEach((encuesta: { idEncuesta: string; }) => {
  
          this.encuestaService.getEncuestaInfo(encuesta.idEncuesta).subscribe(encuesta => {
            encuestaJSON = JSON.parse(JSON.stringify(encuesta))[0];

            encuestaInfo = {
              id: encuestaJSON.id,
              nombre: encuestaJSON.nombre,

            }
            this.encuestas.push(encuestaInfo);
              
            });

        });
      });
    }


  }

  onSelect(encuesta: Encuesta): void {
    this.selectedEncuesta = encuesta;
    this.encuestaPagina();
  }

  encuestaPagina(): void {

    if(this.selectedEncuesta!=null){
      this.router.navigate(['/preguntas'],{ queryParams: {idencuesta: this.selectedEncuesta.id}});
    }
  }
}
