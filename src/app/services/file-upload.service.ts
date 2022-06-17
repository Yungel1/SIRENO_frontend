import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { UsuarioService } from 'src/app/services/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  onFileSelected(file: File) {

    const formData = new FormData();

    formData.append("csv", file);

    const headers = new HttpHeaders().set('Authorization',  'Bearer '+this.usuarioService.getToken());

    return this.http.post(environment.apiUrl+"/procesarcsv", formData,{headers});
  }
}
