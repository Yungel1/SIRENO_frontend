import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CampañaService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  getSituacionesUsuario(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/usuariosituacion/getSituationsUser",{headers});
  }

  getCampañaSituacion(idSituacion: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/situacion/getSituationCampaign?idSituacion="+idSituacion,{headers});
  }

  getCampañaInfo(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/campana/getInfo?id="+id,{headers});
  }

  getCampañasInformes(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/situacion/getCampaingReports",{headers});
  }

  getCampañaInfoInformes(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/campana/getInfoInformes?id="+id,{headers});
  }

  crearCampaña(nombre: string,fechaIni: string,fechaFin: string,descripcion: string,anonima: string,con_registro: string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    const payload = new HttpParams().set('nombre',nombre).set('fechaIni',fechaIni).set("fechaFin",fechaFin)
    .set("descripcion",descripcion).set("anonima",anonima).set("con_registro",con_registro);

    return this.http.post(environment.apiUrl+"/campana", payload, {headers});
  }
  


}
