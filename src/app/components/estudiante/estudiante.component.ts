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

  constructor(private campañaService: CampañaService,private router: Router) { }

  ngOnInit() {
    this.getCampañaInfo();
  }

  getCampañaInfo(): void {

    this.campañaService.getSituacionesUsuario().subscribe(situacionesID => {
      let situacionIdJSON = JSON.parse(JSON.stringify(situacionesID));

      let campañaIdJSON;
      let campañaJSON;
      let campañaInfo: Campaña;

      situacionIdJSON.forEach((situacion: { idSituacion: string; }) => {

        this.campañaService.getCampañaSituacion(situacion.idSituacion).subscribe(campañaId => {
          campañaIdJSON = JSON.parse(JSON.stringify(campañaId));
          this.campañaService.getCampañaInfo(campañaIdJSON[0].idCampaña).subscribe(campaña => {
            campañaJSON = JSON.parse(JSON.stringify(campaña))[0];

            campañaInfo = {
              id: campañaJSON.id,
              nombre: campañaJSON.nombre,
              descripcion: campañaJSON.descripcion
            }
            console.log(campañaInfo)
            this.campanas.push(campañaInfo);
            
          });
      });
      

      });
    });
  }

  onSelect(campaña: Campaña): void {
    this.selectedCampana = campaña;
    this.campañaPagina();
  }

  campañaPagina(): void {

    if(this.selectedCampana!=null){
      this.router.navigate(['/encuestas?idcampana='+this.selectedCampana.id]);
    }
  }
}
