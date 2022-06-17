import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  usuario: string = "";
  contrasena: string = "";
  estudiante: boolean = false;
  docente: boolean = false;
  administrador: boolean = false;
  idDepartamento: string = "";
  isDisabled: boolean = true;

  fileToUpload: File | null = null;
  fileName: string = '';
  file: File | null = null;

  constructor(private usuarioService: UsuarioService,private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cambioCheckBox(){
    
    this.isDisabled = !this.isDisabled;

  }

  convertir0o1(valor: boolean): string{
    
    if(valor==true){
      return '1';
    }
    return '0';

  }

  register(): void {
    
    let estudiante;
    let administrador;
    let docente;

    estudiante = this.convertir0o1(this.estudiante);
    administrador = this.convertir0o1(this.administrador);
    docente = this.convertir0o1(this.docente);

    this.usuarioService.register(this.email,this.usuario,this.contrasena,estudiante,docente,administrador,this.idDepartamento).subscribe( data => {
      console.log(data);
    });
  }

  onFileSelected(event: Event) {

    let files = (event.target as HTMLInputElement).files;
    if (files!=null){
      this.file = files[0];
      this.fileName = this.file.name;
    }
    (event.target as HTMLInputElement).value = "";

  }

  onClick() {

    if (this.file!=null){
      if(this.file.type=="text/csv"){
        this.fileUploadService.onFileSelected(this.file).subscribe({
          error: (error) => {
            if(error.error instanceof ProgressEvent){
              alert("Se ha editado el archivo, bórrelo e insértelo de nuevo");
            }
          }
      })
      }
    }

  }

  onDelete() {

    this.file = null;
    this.fileName = "Vacío"

  }

}
