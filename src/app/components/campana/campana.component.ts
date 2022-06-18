import { Component, OnInit } from '@angular/core';
import { SituacionService } from 'src/app/services/situacion.service';
import { Situacion } from 'src/app/models/situacion.model';

@Component({
  selector: 'app-campana',
  templateUrl: './campana.component.html',
  styleUrls: ['./campana.component.css']
})
export class CampanaComponent implements OnInit {

  situaciones: Situacion[] = [];
  selectedSituacion?: Situacion;

  campanas: string[] = [];

  constructor(private situacionService: SituacionService) { }

  ngOnInit(): void {
    this.getSituacionInfo();
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

  onInsertarCampana(situacion: Situacion,idCampana: string) {
    this.situacionService.insertarCampañaSituacion(situacion.id,idCampana).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
