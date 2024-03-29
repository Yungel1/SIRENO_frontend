import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  getEncuestaCampaña(idCampaña: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/campanaencuesta/getCampaignPolls?idCampaña="+idCampaña,{headers});
  }

  getEncuestaInfo(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/encuesta/getInfo?id="+id,{headers});
  }

  getEncuestaCampañaInformes(idCampaña: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/campanaencuesta/getPollsgReports?idCampaña="+idCampaña,{headers});
  }

  getEncuestaInfoInformes(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/encuesta/getInfoInformes?id="+id,{headers});
  }

  insertarEncuesta(nombre: string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    const payload = new HttpParams().set('nombre',nombre);

    return this.http.post(environment.apiUrl+"/encuesta", payload, {headers});
  }

  eliminarEncuesta(id: string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());

    return this.http.delete(environment.apiUrl+"/encuesta/delete?id="+id, {headers});
  }

  getEncuestas(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/encuesta/getAll",{headers});
  }


}
