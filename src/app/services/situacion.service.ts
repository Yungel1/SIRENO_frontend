import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { CookieService } from "ngx-cookie-service";
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable({
  providedIn: 'root'
})

export class SituacionService {

  constructor(private http: HttpClient, private cookies: CookieService,private usuarioService: UsuarioService) {}

  insertarGrupo(id:string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    const payload = new HttpParams().set('id',id);

    return this.http.post(environment.apiUrl+"/grupo", payload, {headers});
  }

  insertarGrado(id:string,idCentro: string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    const payload = new HttpParams().set('id',id).set('idCentro',idCentro);

    return this.http.post(environment.apiUrl+"/grado", payload, {headers});
  }

  insertarCentro(id:string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    const payload = new HttpParams().set('id',id);

    return this.http.post(environment.apiUrl+"/centro", payload, {headers});
  }

  insertarDepartamento(id:string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    const payload = new HttpParams().set('id',id);

    return this.http.post(environment.apiUrl+"/departamento", payload, {headers});
  }

  insertarAsignatura(id:string,idDepartamento: string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());
    const payload = new HttpParams().set('id',id).set('idDepartamento',idDepartamento);

    return this.http.post(environment.apiUrl+"/asignatura", payload, {headers});
  }

  eliminarGrupo(id:string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());

    return this.http.delete(environment.apiUrl+"/grupo/delete?id="+id, {headers});
  }

  eliminarGrado(id:string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());

    return this.http.delete(environment.apiUrl+"/grado/delete?id="+id, {headers});
  }

  eliminarCentro(id:string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());

    return this.http.delete(environment.apiUrl+"/centro/delete?id="+id, {headers});
  }

  eliminarDepartamento(id:string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());

    return this.http.delete(environment.apiUrl+"/departamento/delete?id="+id, {headers});
  }

  eliminarAsignatura(id:string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());

    return this.http.delete(environment.apiUrl+"/asignatura/delete?id="+id, {headers});
  }

  getSituaciones(): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());

    return this.http.get(environment.apiUrl+"/situacion/getAll", {headers});
  }

  eliminarSituacion(id: string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());

    return this.http.delete(environment.apiUrl+"/situacion/delete?id="+id, {headers});
  }

}
