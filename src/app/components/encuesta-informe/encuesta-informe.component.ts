import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';
import {Encuesta} from "../../models/encuesta.model";
import { CampañaService } from 'src/app/services/campaña.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-encuesta-informe',
  templateUrl: './encuesta-informe.component.html',
  styleUrls: ['./encuesta-informe.component.css']
})
export class EncuestaInformeComponent implements OnInit {

  encuestas: Encuesta[] = [];
  selectedEncuesta?: Encuesta;
  idCampaña?: string | null;
  campanaNombre: string = "";
  hidden: boolean = true;

  constructor(private campañaService: CampañaService,private encuestaService: EncuestaService,private router: Router) { }

  ngOnInit() { 
    this.getEncuestaInfo();
    this.setNombreCampaña();
  }

  getEncuestaInfo(): void {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.idCampaña = urlParams.get('idcampana');

    if(this.idCampaña!=null){

      this.encuestaService.getEncuestaCampañaInformes(this.idCampaña).subscribe({next: encuestaId => {
        let encuestaIdJSON = JSON.parse(JSON.stringify(encuestaId));
  
        let encuestaJSON;
        let encuestaInfo: Encuesta;
  
        encuestaIdJSON.forEach((encuesta: { idEncuesta: string; }) => {
  
          this.encuestaService.getEncuestaInfoInformes(encuesta.idEncuesta).subscribe(encuesta => {
            encuestaJSON = JSON.parse(JSON.stringify(encuesta))[0];

            encuestaInfo = {
              id: encuestaJSON.id,
              nombre: encuestaJSON.nombre,

            }
            this.encuestas.push(encuestaInfo);
              
            });

        });
      },
      error: (e) => {
        alert(e.error.message);
        this.router.navigate(['/docente']);
      }
      });
    }


  }

  setNombreCampaña(){
    
    if(this.idCampaña!=null){
      this.campañaService.getCampañaInfoInformes(this.idCampaña).subscribe(campaña => {
        let campañaJSON = JSON.parse(JSON.stringify(campaña))[0];
        this.campanaNombre = campañaJSON.nombre;
  
      });
    }
  }

  sort() {
    return this.encuestas = this.encuestas.sort((a, b) => a.nombre > b.nombre ? 1 : -1);
  }

  onSelect(encuesta: Encuesta): void {
    this.selectedEncuesta = encuesta;
    this.encuestaPagina();
  }

  encuestaPagina(): void {

    if(this.selectedEncuesta!=null&&this.idCampaña!=null){
      this.router.navigate(['/preguntasInformes'],{ queryParams: {idencuesta: this.selectedEncuesta.id,idcampana: this.idCampaña}});
    }
  }

  atras(): void {
    
    this.router.navigate(['/docente']);
  }

  show() {
    this.hidden = false;
  }

}
