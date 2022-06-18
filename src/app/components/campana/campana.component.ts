import { Component, OnInit } from '@angular/core';
import { SituacionService } from 'src/app/services/situacion.service';
import { CampañaService } from 'src/app/services/campaña.service';
import { Situacion } from 'src/app/models/situacion.model';
import { CampañaInfo } from 'src/app/models/campañaInfo.model';
import { PreguntaRespuestaOpcionService } from 'src/app/services/pregunta-respuesta-opcion.service';
import {PreguntaOpcion} from "../../models/pregunta-opcion.model";
import {OpcionPregunta} from "../../models/opcion-pregunta.model";

@Component({
  selector: 'app-campana',
  templateUrl: './campana.component.html',
  styleUrls: ['./campana.component.css']
})
export class CampanaComponent implements OnInit {

  situaciones: Situacion[] = [];
  selectedSituacion?: Situacion;

  campanas: string[] = [];

  campana: CampañaInfo = {
    id: "",
    nombre: "",
    fechaIni: "",
    fechaFin: "",
    descripcion: "",
    anonima: "0",
    con_registro: "0",
    idEncuesta: "",
  };
  anonima: boolean = false;
  con_registro: boolean = false;


  tipoPregs: string[] = ["respuesta_unica"]
  pregunta: PreguntaOpcion = {
    idPregunta: "",
    tipoPreg:"",
    numPreg:"",
    textoPreg:"",
    opcionespregunta:[]
  };

  idEncuesta: string = "";
  num_preg: string = "";
  tipoPreg : string = "";


  constructor(private situacionService: SituacionService,private campañaService: CampañaService,private preguntaRespuestaOpcionService:PreguntaRespuestaOpcionService) { }

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

  onCrearCampana(){

    let anonima;
    let con_registro;

    anonima = this.convertir0o1(this.anonima);
    con_registro = this.convertir0o1(this.con_registro);

    this.campañaService.crearCampaña(this.campana.nombre,this.campana.fechaIni,this.campana.fechaFin,this.campana.descripcion,
      anonima,con_registro).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });

  }

  onCrearPregunta(){

    console.log(this.idEncuesta,this.num_preg,this.tipoPreg);

  }

  convertir0o1(valor: boolean): string{
    
    if(valor==true){
      return '1';
    }
    return '0';

  }
}
