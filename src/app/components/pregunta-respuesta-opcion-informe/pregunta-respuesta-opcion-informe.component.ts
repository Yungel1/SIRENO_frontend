import { Component, OnInit } from '@angular/core';
import { PreguntaRespuestaOpcionService } from 'src/app/services/pregunta-respuesta-opcion.service';
import {PreguntaOpcion} from "../../models/pregunta-opcion.model";
import {OpcionPregunta} from "../../models/opcion-pregunta.model";
import {Respuesta} from "../../models/respuesta.model";
import { Router } from '@angular/router';
import { CampañaService } from 'src/app/services/campaña.service';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-pregunta-respuesta-opcion-informe',
  templateUrl: './pregunta-respuesta-opcion-informe.component.html',
  styleUrls: ['./pregunta-respuesta-opcion-informe.component.css']
})
export class PreguntaRespuestaOpcionInformeComponent implements OnInit {

  preguntasO: PreguntaOpcion[] = [];
  selectedOpcion?: OpcionPregunta;
  selectedPregunta?: PreguntaOpcion;
  selectedCampana: any;
  idCampaña?: string | null;
  idEncuesta?: string | null;
  listaRespuestas: Respuesta[] = [];
  encuestaNombre: string = "";
  hidden: boolean = true;

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

    if(this.idEncuesta!=null){

      this.preguntaRespuestaOpcionService.getPreguntasEncuestaInforme(this.idEncuesta).subscribe({next: preguntasId => {
        let preguntasIdJSON = JSON.parse(JSON.stringify(preguntasId));
  
        let opcionespreguntaJSON;
        let textoPreguntaJSON: { texto: any; };
        let preguntaOInfo: PreguntaOpcion;
  
        preguntasIdJSON.forEach((pregunta: { idPregunta: string; num_preg: string; }) => {
  
          this.preguntaRespuestaOpcionService.getPreguntaInfoInforme(pregunta.idPregunta).subscribe(preguntaInfo => {

            let preguntaJSON = JSON.parse(JSON.stringify(preguntaInfo));

            this.preguntaRespuestaOpcionService.getTextoInforme("1",pregunta.idPregunta,undefined).subscribe(textoP => {

              this.preguntaRespuestaOpcionService.getOpcionesPreguntaInforme(pregunta.idPregunta).subscribe({next: opcionespregunta => {

                opcionespreguntaJSON = JSON.parse(JSON.stringify(opcionespregunta));

                let opcionespreguntaInfo: OpcionPregunta[]=[];

                opcionespreguntaJSON.forEach((opcionpregunta: { id: string; idPregunta:string;num_opc:string } ) => {

                  this.preguntaRespuestaOpcionService.getTextoInforme("1",opcionpregunta.idPregunta,opcionpregunta.id).subscribe(textoOP => {

                    let textoOPJSON = JSON.parse(JSON.stringify(textoOP));

                    let opcionpreguntaInfo = {
                      id: opcionpregunta.id,
                      texto: textoOPJSON.texto,
                      num_opc: opcionpregunta.num_opc,
                      veces_respondida: "0",
                    }

                    if(this.idEncuesta!=null && this.idCampaña!=null){

                      this.preguntaRespuestaOpcionService.getOpcionesPreguntaVecesRespondida(this.idEncuesta, opcionpregunta.idPregunta, this.idCampaña).subscribe(opcPregRespNum => {
                        
                        let opcPregRespNumInfo = JSON.parse(JSON.stringify(opcPregRespNum));

                        opcPregRespNumInfo.forEach((opcPregRespMedia: { idOpcPreg: string; media:string } ) => {
                          
                          if (opcPregRespMedia.idOpcPreg == opcionpregunta.id){
                            
                            opcionpreguntaInfo["veces_respondida"] = opcPregRespMedia.media;
                          }
                        });
                      })
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
                this.router.navigate(['/encuestasInformes'],{ queryParams: {idcampana: this.idCampaña}});
              }
              });              
            });
          });
        });
      },
      error: (e) => {
        alert(e.error.message);
        this.router.navigate(['/encuestasInformes'],{ queryParams: {idcampana: this.idCampaña}});
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
      this.encuestaService.getEncuestaInfoInformes(this.idEncuesta).subscribe(encuesta => {
        let encuestaJSON = JSON.parse(JSON.stringify(encuesta))[0];
        this.encuestaNombre = encuestaJSON.nombre;
  
      });
    }
  }

  atras(): void {
    
    this.router.navigate(['/encuestasInformes'],{ queryParams: {idcampana: this.idCampaña}});
  }

  removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  show() {
    this.hidden = false;
  }

}
