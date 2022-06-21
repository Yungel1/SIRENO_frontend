import { Component, OnInit } from '@angular/core';
import { PreguntaRespuestaOpcionService } from 'src/app/services/pregunta-respuesta-opcion.service';
import {PreguntaOpcion} from "../../models/pregunta-opcion.model";
import {OpcionPregunta} from "../../models/opcion-pregunta.model";
import {Respuesta} from "../../models/respuesta.model";
import { Router } from '@angular/router';
import { CampañaService } from 'src/app/services/campaña.service';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-pregunta-respuesta-opcion',
  templateUrl: './pregunta-respuesta-opcion.component.html',
  styleUrls: ['./pregunta-respuesta-opcion.component.css']
})
export class PreguntaRespuestaOpcionComponent implements OnInit {

  preguntasO: PreguntaOpcion[] = [];
  selectedOpcion?: OpcionPregunta;
  selectedPregunta?: PreguntaOpcion;
  selectedCampana: any;
  idCampaña?: string | null;
  idEncuesta?: string | null;
  idSituacion?: string | null;
  listaRespuestas: Respuesta[] = [];
  encuestaNombre: string = "";

  constructor(private encuestaService: EncuestaService,private campañaService: CampañaService,private preguntaRespuestaOpcionService: PreguntaRespuestaOpcionService,private router: Router) { }

  ngOnInit() {
    this.getPreguntaO();
    this.setNombreEncuesta();
  }

  getPreguntaO(): void {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.idEncuesta = urlParams.get('idencuesta');
    this.idCampaña = urlParams.get('idcampana');
    this.idSituacion = urlParams.get('idsituacion');

    if(this.idEncuesta!=null){

      this.preguntaRespuestaOpcionService.getPreguntasEncuesta(this.idEncuesta).subscribe({next:preguntasId => {
        let preguntasIdJSON = JSON.parse(JSON.stringify(preguntasId));
  
        let opcionespreguntaJSON;
        let textoPreguntaJSON: { texto: any; };
        let textoOPJSON;
        let opcionpreguntaInfo: OpcionPregunta;
        let preguntaOInfo: PreguntaOpcion;
  
        preguntasIdJSON.forEach((pregunta: { idPregunta: string; num_preg: string; }) => {
  
          this.preguntaRespuestaOpcionService.getPreguntaInfo(pregunta.idPregunta).subscribe(preguntaInfo => {

            let preguntaJSON = JSON.parse(JSON.stringify(preguntaInfo));

            this.preguntaRespuestaOpcionService.getTexto("1",pregunta.idPregunta,undefined).subscribe(textoP => {

              this.preguntaRespuestaOpcionService.getOpcionesPregunta(pregunta.idPregunta).subscribe({next: opcionespregunta => {

                opcionespreguntaJSON = JSON.parse(JSON.stringify(opcionespregunta));

                let opcionespreguntaInfo: OpcionPregunta[]=[];

                opcionespreguntaJSON.forEach((opcionpregunta: { id: string; idPregunta:string;num_opc:string } ) => {

                  this.preguntaRespuestaOpcionService.getTexto("1",opcionpregunta.idPregunta,opcionpregunta.id).subscribe(textoOP => {
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


              },
              error: (e) => {
                alert("La encuesta no está definida correctamente, contacta con un administrador");
                this.router.navigate(['/encuestas'],{ queryParams: {idcampana: this.idCampaña, idsituacion: this.idSituacion}});
              }
            });
              
            });
          });
        });
      },
      error: (e) => {
        alert(e.error.message);
        this.router.navigate(['/encuestas'],{ queryParams: {idcampana: this.idCampaña, idsituacion: this.idSituacion}});
      }
    });
    }
    
  }

  sortPreg() {
    return this.preguntasO = this.preguntasO.sort((a, b) => a.numPreg > b.numPreg ? 1 : -1);
  }

  sortOpc(opciones:OpcionPregunta[]) {
    return opciones = opciones.sort((a, b) => a.num_opc > b.num_opc ? 1 : -1);
  }

  setNombreEncuesta(){
    
    if(this.idEncuesta!=null){
      this.encuestaService.getEncuestaInfo(this.idEncuesta).subscribe(encuesta => {
        let encuestaJSON = JSON.parse(JSON.stringify(encuesta))[0];
        this.encuestaNombre = encuestaJSON.nombre;
  
      });
    }
  }


  getValue(opcion:OpcionPregunta,pregunta:PreguntaOpcion): void {
    this.selectedOpcion = opcion;
    this.selectedPregunta = pregunta;
    this.insertarRespuesta();
  }

  insertarRespuesta(): void {
    if(this.selectedOpcion!=null&&this.selectedPregunta!=null&&this.idCampaña!=null&&this.idEncuesta!=null){

      let respuesta = {
        idCampaña: this.idCampaña,
        idEncuesta: this.idEncuesta,
        idPregunta: this.selectedPregunta.idPregunta,
        idOpcionesPregunta: this.selectedOpcion.id,
        texto: this.selectedOpcion.texto
      }

      let respuestaBorrar = this.listaRespuestas.find(function(res) {
        return res.idPregunta === respuesta.idPregunta;
      });

      if(respuestaBorrar){
        this.removeItem(this.listaRespuestas,respuestaBorrar)
      }
      this.listaRespuestas.push(respuesta);

    }
  }

  guardar(): void {
    
    if(this.listaRespuestas.length==this.preguntasO.length){
      this.listaRespuestas.forEach(respuesta => {
        this.preguntaRespuestaOpcionService
        .insertarRespuesta(respuesta.idCampaña,respuesta.idEncuesta,respuesta.idPregunta,respuesta.idOpcionesPregunta,respuesta.texto)
        .subscribe(respuesta => {
          console.log(respuesta);
        });
      }); 

      if (this.idSituacion!=null && this.idSituacion!=undefined){
        this.preguntaRespuestaOpcionService.ponerRespondida(this.idSituacion, true).subscribe();
      };     

      this.router.navigate(['/estudiante']);
    } else{
      alert("Responde todas las preguntas para poder guardar");
    }    
  }

  removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
