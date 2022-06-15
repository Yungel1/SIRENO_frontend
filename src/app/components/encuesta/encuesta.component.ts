import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';
import {Encuesta} from "../../models/encuesta.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EncuestaComponent implements OnInit {

  encuesta: Encuesta[] = [];
  selectedEncuesta?: Encuesta;

  constructor(private encuestaService: EncuestaService,private router: Router) { }

  ngOnInit() {
    //this.getEncuestaInfo();
  }

  // getCampañaInfo(): void {

  //   this.campañaService.getSituacionesUsuario().subscribe(situacionesID => {
  //     let situacionIdJSON = JSON.parse(JSON.stringify(situacionesID));

  //     let campañaIdJSON;
  //     let campañaJSON;
  //     let campañaInfo: Campaña;

  //     situacionIdJSON.forEach((situacion: { idSituacion: string; }) => {

  //       this.campañaService.getCampañaSituacion(situacion.idSituacion).subscribe(campañaId => {
  //         campañaIdJSON = JSON.parse(JSON.stringify(campañaId));
  //         this.campañaService.getCampañaInfo(campañaIdJSON[0].idCampaña).subscribe(campaña => {
  //           campañaJSON = JSON.parse(JSON.stringify(campaña))[0];

  //           campañaInfo = {
  //             id: campañaJSON.id,
  //             nombre: campañaJSON.nombre,
  //             descripcion: campañaJSON.descripcion
  //           }
  //           console.log(campañaInfo)
  //           this.campanas.push(campañaInfo);
            
  //         });
  //       });
  //     });
  //   });
  // }

  // onSelect(campaña: Campaña): void {
  //   this.selectedCampana = campaña;
  //   this.campañaPagina();
  // }

  // campañaPagina(): void {

  //   if(this.selectedCampana!=null){
  //     this.router.navigate(['/encuestas?idcampana='+this.selectedCampana.id]);
  //   }
  // }
}
