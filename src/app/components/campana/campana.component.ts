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

  campana: string = "";

  constructor(private situacionService: SituacionService) { }

  ngOnInit(): void {
    this.getSituacionInfo();
  }

  getSituacionInfo(){

    this.situacionService.getSituaciones().subscribe( situaciones => {
      this.situaciones = JSON.parse(JSON.stringify(situaciones));
    });
  }

  sortSituaciones() {
    return this.situaciones = this.situaciones.sort((a, b) => a.id > b.id ? 1 : -1);
  }

  onInsertarCampana(situacion: Situacion,idCampana: string) {
    console.log(situacion,idCampana)
  }

}
