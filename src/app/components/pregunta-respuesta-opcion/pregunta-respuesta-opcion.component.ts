import { Component, OnInit } from '@angular/core';
import { PreguntaRespuestaOpcionService } from 'src/app/services/pregunta-respuesta-opcion.service';
import {PreguntaOpcion} from "../../models/pregunta-opcion.model";
import {OpcionPregunta} from "../../models/opcion-pregunta.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta-respuesta-opcion',
  templateUrl: './pregunta-respuesta-opcion.component.html',
  styleUrls: ['./pregunta-respuesta-opcion.component.css']
})
export class PreguntaRespuestaOpcionComponent implements OnInit {

  preguntasO: PreguntaOpcion[] = [];
  selectedPreguntaO?: PreguntaOpcion;

  constructor(private preguntaRespuestaOpcionService: PreguntaRespuestaOpcionService,private router: Router) { }

  ngOnInit() {
    this.getPreguntaO();
  }

  getPreguntaO(): void {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idEncuesta = urlParams.get('idencuesta');

    if(idEncuesta!=null){

      this.preguntaRespuestaOpcionService.getPreguntasEncuesta(idEncuesta).subscribe(preguntasId => {
        let preguntasIdJSON = JSON.parse(JSON.stringify(preguntasId));
  
        let opcionespreguntaJSON;
        let preguntaJSON: { tipoPreg: any; };
        let textoPreguntaJSON: { texto: any; };
        let textoOPJSON;
        let opcionpreguntaInfo: OpcionPregunta;
        let preguntaOInfo: PreguntaOpcion;
  
        preguntasIdJSON.forEach((pregunta: { idPregunta: string; }) => {
  
          this.preguntaRespuestaOpcionService.getPreguntaInfo(pregunta.idPregunta).subscribe(preguntaInfo => {

            preguntaJSON = JSON.parse(JSON.stringify(preguntaInfo));

            this.preguntaRespuestaOpcionService.getTexto("1",pregunta.idPregunta,undefined).subscribe(textoP => {

              this.preguntaRespuestaOpcionService.getOpcionesPregunta(pregunta.idPregunta).subscribe(opcionespregunta => {

                opcionespreguntaJSON = JSON.parse(JSON.stringify(opcionespregunta));

                let opcionespreguntaInfo: OpcionPregunta[]=[];

                opcionespreguntaJSON.forEach((opcionpregunta: { id: string; idPregunta:string; } ) => {

                  this.preguntaRespuestaOpcionService.getTexto("1",opcionpregunta.idPregunta,opcionpregunta.id).subscribe(textoOP => {
                    textoOPJSON = JSON.parse(JSON.stringify(textoOP))

                    opcionpreguntaInfo = {
                      id: opcionpregunta.id,
                      texto: textoOPJSON.texto,
                    }

                    opcionespreguntaInfo.push(opcionpreguntaInfo);

                  })
                });

                textoPreguntaJSON = JSON.parse(JSON.stringify(textoP));

                preguntaOInfo = {
                  idPregunta: pregunta.idPregunta,
                  tipoPreg:preguntaJSON.tipoPreg,
                  textoPreg: textoPreguntaJSON.texto,
                  opcionespregunta: opcionespreguntaInfo 
                }

                this.preguntasO.push(preguntaOInfo);


              })
            });
          });
        });
      });
    }
    
  }


  onSelect(preguntaO:PreguntaOpcion): void {
    console.log(this.preguntasO);
  }
/*
  campañaPagina(): void {

    if(this.selectedCampana!=null){
      this.router.navigate(['/encuestas'],{ queryParams: {idcampana: this.selectedCampana.id}});
    }
  }
*/
}
