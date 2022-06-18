import { Component, OnInit } from '@angular/core';
import { SituacionService } from 'src/app/services/situacion.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { CampañaService } from 'src/app/services/campaña.service';
import { Situacion } from 'src/app/models/situacion.model';
import { CampañaInfo } from 'src/app/models/campañaInfo.model';
import { DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-campana',
  templateUrl: './campana.component.html',
  styleUrls: ['./campana.component.css']
})
export class CampanaComponent implements OnInit {

  situaciones: Situacion[] = [];
  canpanasInfo: CampañaInfo[] = [];
  selectedSituacion?: Situacion;
  selectedCampana?: CampañaInfo;
  encuestaId: string = "";
  encuestaNombre: string = "";
  encuestas: string[] = [];
  campanas: string[] = [];

  constructor(private situacionService: SituacionService, private encuestaService: EncuestaService,  private campanaService: CampañaService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getSituacionInfo();
    this.getCampanaInfo();
  }

  getSituacionInfo(){

    let situacionInfo: Situacion; 

    this.situacionService.getSituaciones().subscribe( situaciones => {
      let situacionesJSON = JSON.parse(JSON.stringify(situaciones));
      this.situaciones = [];
      situacionesJSON.forEach((situacion: { id: string; idGrado: string; idDocente: string; idGrupo: string; idAsignatura: string; idCampaña: string; }) => {
        situacionInfo = {
          id: situacion.id,
          idGrado: situacion.idGrado,
          idDocente: situacion.idDocente,
          idGrupo: situacion.idGrupo,
          idAsignatura: situacion.idAsignatura,
          idCampana: situacion.idCampaña,
        }

        this.situaciones.push(situacionInfo);
      })
    });
  }

  sortSituaciones() {
    return this.situaciones = this.situaciones.sort((a, b) => a.id > b.id ? 1 : -1);
  }

  onInsertarEncuestaCampana(campana: CampañaInfo,idEncuesta: string) {
    this.campanaService.getEncuestaCampaña(campana.id).subscribe(idEncuestaJson => {
      let idEncuestaJSON  = JSON.parse(JSON.stringify(idEncuestaJson));
      if (idEncuestaJSON.length==0){
        this.campanaService.insertarEncuestaCampaña(campana.id,idEncuesta).subscribe( data => {
          console.log(data);
          this.ngOnInit();
        });
      }
      else{
        this.campanaService.actualizarEncuestaCampaña(campana.id,idEncuesta).subscribe( data => {
          console.log(data);
          this.ngOnInit();
        });
      }
    });
  }

  onDeleteCampana(canpana: CampañaInfo) {
    this.campanaService.eliminarCampana(canpana.id).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  getCampanaInfo(){

    let canpanaInfo: CampañaInfo;

    this.campanaService.getCampañas().subscribe( canpanas => {
      let canpanaJSON  = JSON.parse(JSON.stringify(canpanas));
      this.canpanasInfo = [];
      canpanaJSON.forEach((canpana: { id: string; nombre: string; fechaIni: string; fechaFin: string; descripcion: string; anonima: string; con_registro: string; }) => {
        this.campanaService.getEncuestaCampaña(canpana.id).subscribe(idEncuesta => {
          let idEncuestaJSON  = JSON.parse(JSON.stringify(idEncuesta));
          let fechaIniDate = this.datePipe.transform(canpana.fechaIni, 'yyyy-MM-dd');
          let fechaFinDate =  this.datePipe.transform(canpana.fechaFin, 'yyyy-MM-dd');

          if (fechaIniDate!=null && fechaFinDate!=null){
            canpanaInfo = {
              id: canpana.id,
              nombre: canpana.nombre,
              fechaIni: fechaIniDate,
              fechaFin: fechaFinDate,
              descripcion: canpana.descripcion,
              anonima: canpana.anonima,
              con_registro: canpana.con_registro,
              idEncuesta: "",
            }
          } 
          if (idEncuestaJSON.length!=0){
            canpanaInfo["idEncuesta"] = idEncuestaJSON[0].idEncuesta;
          }    
    
          this.canpanasInfo.push(canpanaInfo);
        })        
      })
    });
  }

  sortCampanas() {
    return this.canpanasInfo = this.canpanasInfo.sort((a, b) => a.id > b.id ? 1 : -1);
  }

  onInsertarCampana(situacion: Situacion,idCampana: string) {
    this.situacionService.insertarCampañaSituacion(situacion.id,idCampana).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  onCrearEncuesta() {
  
    this.encuestaService.insertarEncuesta(this.encuestaNombre).subscribe( data => {
      console.log(data);
    });
  }

  onEliminarEncuesta() {
    
    this.encuestaService.eliminarEncuesta(this.encuestaId).subscribe( data => {
      console.log(data);
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
