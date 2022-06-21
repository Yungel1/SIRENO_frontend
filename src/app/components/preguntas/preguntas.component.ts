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
  numPreg: string = "";
  texto: string = "";
  num_opc: string = "";
  textoOpc: string = "";
  tipoPreg : string = "";
  pregId :  string = "";
  preguntasO: PreguntaOpcion[] = [];
  allPreguntas: PreguntaOpcion[] = [];
  selectedOpcion?: OpcionPregunta;
  selectedPregunta: PreguntaOpcion = {
    idPregunta: "",
    tipoPreg:"",
    numPreg:"",
    textoPreg: "",
    opcionespregunta: []
  };

  hidden: boolean = true;

  constructor(private encuestaService: EncuestaService,private preguntaRespuestaOpcionService: PreguntaRespuestaOpcionService) { }

  ngOnInit(): void {
    this.getQueryParam();
    this.setNombreEncuesta();
    this.getPreguntaO();
    this.getAllPreguntas();
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

    if(this.idEncuesta!=null){
      this.preguntaRespuestaOpcionService.checkNumPreg(this.idEncuesta,this.num_preg).subscribe({next: data => {
        this.preguntaRespuestaOpcionService.insertarPregunta(this.tipoPreg).subscribe(preguntaId => {
          if(this.idEncuesta!=null){
            this.preguntaRespuestaOpcionService.relacionarEncuestaPregunta(this.idEncuesta,preguntaId,this.num_preg).subscribe(dataPregunta => {
              this.preguntaRespuestaOpcionService.añadirTextoPregunta(preguntaId,this.texto,"1").subscribe(dataTexto => {
                console.log(dataTexto);
                this.ngOnInit();
              });
            });
          }
        });
      },
      error: (e) => {
        alert(e.error.message);
      }
      });
    }
    
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
  
        this.preguntasO = [];

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

                if(this.selectedPregunta.idPregunta==preguntaOInfo.idPregunta){
                  this.selectedPregunta = preguntaOInfo;
                }

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
    this.selectedPregunta = pregunta;
    this.hidden = false;
  }

  onEliminarPregunta() {
    this.preguntaRespuestaOpcionService.eliminarPregunta(this.pregId).subscribe({next: data => {
      console.log(data);
      this.ngOnInit();
      this.hidden = true;
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

  onEliminarPreguntaEncuesta(pregunta:PreguntaOpcion) {
    if (this.idEncuesta!=null){
      this.preguntaRespuestaOpcionService.eliminarPreguntaEncuesta(pregunta.idPregunta,this.idEncuesta).subscribe( data => {
        console.log(data);
        this.ngOnInit();
        this.hidden = true;
      });
    }
  }

  onEliminarOpcion(opcion:OpcionPregunta) {
    this.preguntaRespuestaOpcionService.eliminarOpcion(opcion.id).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  onCrearOpcion(){

    this.preguntaRespuestaOpcionService.checkNumOpc(this.selectedPregunta.idPregunta,this.num_opc).subscribe({next: data => {
      this.preguntaRespuestaOpcionService.insertarOpcion(this.selectedPregunta.idPregunta,this.num_opc).subscribe(opcionId => {
        this.preguntaRespuestaOpcionService.añadirTextoOpcion(this.selectedPregunta.idPregunta,opcionId,this.textoOpc,"1").subscribe(dataTexto => {
          console.log(dataTexto);
          this.ngOnInit();
        })
      })
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
    
  }

  getAllPreguntas(): void{
    this.preguntaRespuestaOpcionService.getPreguntasAll().subscribe(preguntas=> {

      let preguntasJSON = JSON.parse(JSON.stringify(preguntas));
      this.allPreguntas = [];

      preguntasJSON["preguntas"].forEach((pregunta: { id: string; num_preg: string; }) => {
 
        this.preguntaRespuestaOpcionService.getPreguntaInfoInforme(pregunta.id).subscribe(preguntaInfo => {

          let preguntaJSON = JSON.parse(JSON.stringify(preguntaInfo));
         
          this.preguntaRespuestaOpcionService.getTextoAdmin("1",pregunta.id,undefined).subscribe(textoP => {

            let textoPreguntaJSON = JSON.parse(JSON.stringify(textoP));

            let preguntaInfo = {
              idPregunta: pregunta.id,
              tipoPreg:preguntaJSON.tipoPreg,
              numPreg:pregunta.num_preg,
              textoPreg: textoPreguntaJSON.texto,
              opcionespregunta: [] 
            }

            this.allPreguntas.push(preguntaInfo);

          });
        });
      });    
    });
  }

  onInsertarPreguntaEncuesta(){
    if(this.idEncuesta!=null){
      this.preguntaRespuestaOpcionService.checkNumPreg(this.idEncuesta,this.numPreg).subscribe({next:data => {
        if(this.idEncuesta!=null){
          this.preguntaRespuestaOpcionService.relacionarEncuestaPregunta(this.idEncuesta,this.pregId,this.numPreg).subscribe({next:dataPregunta => {
            console.log(dataPregunta);
            this.ngOnInit();
          },
          error: (e) => {
            alert(e.error.message);
          }
          });
        }
      },
      error: (e) => {
        alert(e.error.message);
      }
      });
    } 
  }

  sortAllPreg(){
    
    return this.allPreguntas = this.allPreguntas.sort((a, b) => a.textoPreg > b.textoPreg ? 1 : -1);

  }
}
