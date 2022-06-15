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

  getCampañaSituacion(idSituacion: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/situacion/getSituationCampaign?idSituacion="+idSituacion,{headers});
  }

  getCampañaInfo(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    return this.http.get(environment.apiUrl+"/campana/getInfo?id="+id,{headers});
  }


}
