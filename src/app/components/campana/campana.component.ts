import { Component, OnInit } from '@angular/core';
import { SituacionService } from 'src/app/services/situacion.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { DatePipe } from '@angular/common';
import { isEmpty } from 'rxjs';
import { CampañaService } from 'src/app/services/campaña.service';
import { Situacion } from 'src/app/models/situacion.model';
import { CampañaInfo } from 'src/app/models/campañaInfo.model';
import { PreguntaRespuestaOpcionService } from 'src/app/services/pregunta-respuesta-opcion.service';
import {PreguntaOpcion} from "../../models/pregunta-opcion.model";
import {OpcionPregunta} from "../../models/opcion-pregunta.model";
import { Encuesta } from 'src/app/models/encuesta.model';
import { Router } from '@angular/router';

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
  selectedEncuesta?: Encuesta;
  encuestaId: string = "";
  encuestaNombre: string = "";
  encuestas: string[] = [];
  campanas: string[] = [];

  constructor(private router: Router,private situacionService: SituacionService, private encuestaService: EncuestaService,  private campanaService: CampañaService, private datePipe: DatePipe,private preguntaRespuestaOpcionService:PreguntaRespuestaOpcionService) { }
  
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



  encuesta: Encuesta = {
    id: "",
    nombre:"",
  };

  encuestasInfo: Encuesta[] = [];

  ngOnInit(): void {
    this.getCampanaInfo();
    this.getEncuestaInfo();
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
      this.ngOnInit();
    });
  }

  onEliminarEncuesta(encuesta: Encuesta) {
    
    this.encuestaService.eliminarEncuesta(encuesta.id).subscribe( data => {
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

    this.campanaService.crearCampaña(this.campana.nombre,this.campana.fechaIni,this.campana.fechaFin,this.campana.descripcion,
      anonima,con_registro).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });

  }

  getEncuestaInfo(){

    let encuestaInfo: Encuesta;

    this.encuestaService.getEncuestas().subscribe( encuestas => {
      let encuestasJSON  = JSON.parse(JSON.stringify(encuestas));
      this.encuestasInfo = [];
      encuestasJSON.forEach((encuesta: { id: string; nombre: string; }) => {

        encuestaInfo = {
          id: encuesta.id,
          nombre: encuesta.nombre,
        };

        this.encuestasInfo.push(encuestaInfo);
      })        
    });

  }

  sortEncuestas() {
    return this.encuestasInfo = this.encuestasInfo.sort((a, b) => a.nombre > b.nombre ? 1 : -1);
  }

  onCrearPreguntas(encuesta: Encuesta): void {
    this.selectedEncuesta = encuesta;
    this.preguntasPagina();
  }

  preguntasPagina(): void {

    if(this.selectedEncuesta!=null&&this.selectedEncuesta.id!=null){
      this.router.navigate(['/preguntasencuesta'],{ queryParams: {idencuesta: this.selectedEncuesta.id}});
    }
  }

  convertir0o1(valor: boolean): string{
    
    if(valor==true){
      return '1';
    }
    return '0';

  }
}
