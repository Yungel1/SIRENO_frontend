import { Component, OnInit } from '@angular/core';
import { CampañaService } from 'src/app/services/campaña.service';
import {Campaña} from "../../models/campaña.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  campanas: Campaña[] = [];
  selectedCampana?: Campaña;
  hidden: boolean = true;

  constructor(private campañaService: CampañaService,private router: Router) { }

  ngOnInit() {
    this.getCampañaInfo();
    
  }

  getCampañaInfo(): void {

    this.campañaService.getSituacionesUsuario().subscribe( (situacionesID) => {
      let situacionIdJSON = JSON.parse(JSON.stringify(situacionesID));
      let cont = 0;
     
      let campañaJSON;
      let campañaInfo: Campaña;

      situacionIdJSON.forEach((situacion: { idSituacion: string; }) => {

        let idSituacion = situacion.idSituacion;

        this.campañaService.getCampañaSituacion(situacion.idSituacion).subscribe({next: campañaId => {
          
          let campañaIdJSON = JSON.parse(JSON.stringify(campañaId));
         
          this.campañaService.getCampañaInfo(campañaIdJSON[0].idCampaña).subscribe(campaña => {
            campañaJSON = JSON.parse(JSON.stringify(campaña))[0];
            campañaInfo = {
              id: campañaIdJSON[0].idCampaña,
              idSituacion: idSituacion,
              nombre: campañaJSON.nombre,
              descripcion: campañaJSON.descripcion
            }

            this.campanas.push(campañaInfo);
            
          });
        },
        error: (e) => {
          cont++;
          if (cont==situacionIdJSON.length){
            alert("No tienes ninguna campaña asociada");
            this.router.navigate(['/']);
          }
        }
        });
      });
    });  

  }

  sort() {
    return this.campanas = this.campanas.sort((a, b) => a.nombre > b.nombre ? 1 : -1);
  }

  onSelect(campaña: Campaña): void {
    this.selectedCampana = campaña;
    this.campañaPagina();
  }

  campañaPagina(): void {

   
    if(this.selectedCampana!=null){
   
      this.router.navigate(['/encuestas'],{ queryParams: {idcampana: this.selectedCampana.id, idsituacion: this.selectedCampana.idSituacion}});
    }
  }

  atras(): void {
    
    this.router.navigate(['/']);
  }

  show() {
    this.hidden = false;
  }
}
