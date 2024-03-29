import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(usuario: string, contraseña: string): Observable<any> { 
    const payload = new HttpParams().set('usuario', usuario).set('contraseña', contraseña);
    return this.http.post(environment.apiUrl+"/login", payload);
  }

  register(email:string, usuario: string, contraseña: string, estudiante: string, docente: string, administrador: string, idDepartamento: string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.getToken());


    const payload = new HttpParams().set('email',email).set('usuario', usuario).set('contraseña', contraseña)
    .set('estudiante',estudiante).set('docente',docente).set('administrador',administrador).set('idDepartamento',idDepartamento);
    if(docente=="0"){
      payload.delete("idDepartamento");
    }
    return this.http.post(environment.apiUrl+"/register", payload, {headers});
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  deleteToken() {
    return this.cookies.delete("token");
  }

  getUsuarioInfo() {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.getToken());
    return this.http.get(environment.apiUrl+"/usuario/getInfo",{headers});
  }

  borrarUsuario(usuario: string) {
    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.getToken());
    return this.http.delete(environment.apiUrl+"/usuario/delete?usuario="+usuario,{headers});
  }

}
