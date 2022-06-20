import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/services/encuesta.service';
import {PreguntaOpcion} from "../../models/pregunta-opcion.model";
import {OpcionPregunta} from "../../models/opcion-pregunta.model";
import { PreguntaRespuestaOpcionService } from 'src/app/services/pregunta-respuesta-opcion.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  encuestaNombre: string = "";
  idEncuesta: string | null = "";

  num_preg: string = "";
  tipoPreg : string = "";
  preguntasO: PreguntaOpcion[] = [];
  selectedOpcion?: OpcionPregunta;
  selectedPregunta?: PreguntaOpcion;

  constructor(private encuestaService: EncuestaService,private preguntaRespuestaOpcionService: PreguntaRespuestaOpcionService) { }

  ngOnInit(): void {
    this.getQueryParam();
    this.setNombreEncuesta();
    this.getPreguntaO();
  }

  getQueryParam(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.idEncuesta = urlParams.get('idencuesta');
  }

  setNombreEncuesta(){
    
    if(this.idEncuesta!=null){
      this.encuestaService.getEncuestaInfoInformes(this.idEncuesta).subscribe(encuesta => {
        let encuestaJSON = JSON.parse(JSON.stringify(encuesta))[0];
        this.encuestaNombre = encuestaJSON.nombre;
  
      });
    }
  }

  onCrearPregunta(){

    console.log(this.idEncuesta,this.num_preg,this.tipoPreg);

  }

  getPreguntaO(): void {

    if(this.idEncuesta!=null){

      this.preguntaRespuestaOpcionService.getPreguntas(this.idEncuesta).subscribe(preguntasId => {

        let preguntasIdJSON = JSON.parse(JSON.stringify(preguntasId));
  
        let opcionespreguntaJSON;
        let textoPreguntaJSON: { texto: any; };
        let textoOPJSON;
        let opcionpreguntaInfo: OpcionPregunta;
        let preguntaOInfo: PreguntaOpcion;
  
        preguntasIdJSON.forEach((pregunta: { idPregunta: string; num_preg: string; }) => {
 
          this.preguntaRespuestaOpcionService.getPreguntaInfoInforme(pregunta.idPregunta).subscribe(preguntaInfo => {

            let preguntaJSON = JSON.parse(JSON.stringify(preguntaInfo));

            this.preguntaRespuestaOpcionService.getTextoAdmin("1",pregunta.idPregunta,undefined).subscribe(textoP => {

              this.preguntaRespuestaOpcionService.getOpciones(pregunta.idPregunta).subscribe(opcionespregunta => {

                opcionespreguntaJSON = JSON.parse(JSON.stringify(opcionespregunta));

                let opcionespreguntaInfo: OpcionPregunta[]=[];

                opcionespreguntaJSON.forEach((opcionpregunta: { id: string; idPregunta:string;num_opc:string } ) => {

                  this.preguntaRespuestaOpcionService.getTextoAdmin("1",opcionpregunta.idPregunta,opcionpregunta.id).subscribe(textoOP => {
                    textoOPJSON = JSON.parse(JSON.stringify(textoOP))

                    opcionpreguntaInfo = {
                      id: opcionpregunta.id,
                      texto: textoOPJSON.texto,
                      num_opc: opcionpregunta.num_opc,
                      veces_respondida: "0",
                    }

                    opcionespreguntaInfo.push(opcionpreguntaInfo);

                  })
                });

                textoPreguntaJSON = JSON.parse(JSON.stringify(textoP));

                preguntaOInfo = {
                  idPregunta: pregunta.idPregunta,
                  tipoPreg:preguntaJSON.tipoPreg,
                  numPreg:pregunta.num_preg,
                  textoPreg: textoPreguntaJSON.texto,
                  opcionespregunta: opcionespreguntaInfo 
                }

                this.preguntasO.push(preguntaOInfo);


              });
              
            });
          });
        });
      });
    }
    
  }

  sortPreg() {
    return this.preguntasO = this.preguntasO.sort((a, b) => a.numPreg > b.numPreg ? 1 : -1);
  }

  sortOpc(opciones:OpcionPregunta[]) {
    return opciones = opciones.sort((a, b) => a.num_opc > b.num_opc ? 1 : -1);
  }

  onMostrarOpciones(pregunta:PreguntaOpcion) {
    console.log(pregunta.opcionespregunta)
  }

  onEliminarPregunta(pregunta:PreguntaOpcion) {
    console.log(pregunta.idPregunta)
  }

}
