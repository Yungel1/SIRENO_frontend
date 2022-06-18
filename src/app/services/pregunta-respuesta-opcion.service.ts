import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PreguntaRespuestaOpcionService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  getPreguntasEncuesta(idEncuesta: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/encuestapregunta/getPollQuestions?idEncuesta="+idEncuesta,{headers});
  }

  getPreguntaInfo(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/pregunta/getInfo?id="+id,{headers});
  }

  getOpcionesPregunta(idPregunta: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/opcionespregunta/getQuestionOptions?idPregunta="+idPregunta,{headers});
  }

  getTexto(idIdioma:string,idPregunta: string,idOpcionesPregunta?:string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    if(idOpcionesPregunta==undefined){
      return this.http.get(environment.apiUrl+"/texto/get?idIdioma="+idIdioma+"&idPregunta="+idPregunta,{headers});
    }
    return this.http.get(environment.apiUrl+"/texto/get?idIdioma="+idIdioma+"&idPregunta="+idPregunta+"&idOpcionesPregunta="+idOpcionesPregunta,{headers});
  }

  getTextoInforme(idIdioma:string,idPregunta: string,idOpcionesPregunta?:string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    if(idOpcionesPregunta==undefined){
      return this.http.get(environment.apiUrl+"/texto/getInforme?idIdioma="+idIdioma+"&idPregunta="+idPregunta,{headers});
    }
    return this.http.get(environment.apiUrl+"/texto/getInforme?idIdioma="+idIdioma+"&idPregunta="+idPregunta+"&idOpcionesPregunta="+idOpcionesPregunta,{headers});
  }

  insertarRespuesta(idCampaña:string, idEncuesta: string,idPregunta: string,idOpcionesPregunta:string,texto:string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    const payload = new HttpParams().set('idCampaña',idCampaña).set('idEncuesta',idEncuesta).set('idPregunta', idPregunta)
    .set('idOpcionesPregunta', idOpcionesPregunta).set('texto',texto);
    return this.http.post(environment.apiUrl+"/respuesta",payload,{headers});
  }

  ponerRespondida(idSituacion:string, respondida: boolean): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    const payload = new HttpParams().set('idSituacion',idSituacion).set('respondida',respondida);
    return this.http.put(environment.apiUrl+"/usuariosituacion/update",payload,{headers});
  }

  getPreguntasEncuestaInforme(idEncuesta: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/encuestapregunta/getQuestionsReports?idEncuesta="+idEncuesta,{headers});
  }

  getPreguntaInfoInforme(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/pregunta/getInfoInforme?id="+id,{headers});
  }

  getOpcionesPreguntaInforme(idPregunta: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/opcionespregunta/getQuestionOptionsReports?idPregunta="+idPregunta,{headers});
  }

  getOpcionesPreguntaVecesRespondida(idEncuesta: string, idPregunta: string, idCampaña: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/respuesta/getMedia?idEncuesta="+idEncuesta+"&idPregunta="+idPregunta+"&idCampaña="+idCampaña,{headers});
  }


}
