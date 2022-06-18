import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { SituacionService } from 'src/app/services/situacion.service';

@Component({
  selector: 'app-situacion',
  templateUrl: './situacion.component.html',
  styleUrls: ['./situacion.component.css']
})
export class SituacionComponent implements OnInit {

  fileToUpload: File | null = null;
  fileName: string = '';
  file: File | null = null;

  grupoID: string = "";
  centroID: string = "";
  gradoID: string = "";
  departamentoID: string = "";
  asignaturaID: string = "";
  asignaturaDeleteID: string = "";
  gradoDeleteID: string = "";
  centroGradoID: string = "";
  departamentoAsignaturaID: string = "";

  constructor(private fileUploadService: FileUploadService, private situacionService: SituacionService) { }

  ngOnInit(): void {
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
    this.fileName = "Inserte CSV"

  }

  onCrearGrupo() {
    
    this.situacionService.insertarGrupo(this.grupoID).subscribe( data => {
      console.log(data);
    });
  }

  onCrearGrado() {
  
    this.situacionService.insertarGrado(this.gradoID,this.centroID).subscribe( data => {
      console.log(data);
    });
  }

  onCrearDepartamento() {
  
    this.situacionService.insertarDepartamento(this.departamentoID).subscribe( data => {
      console.log(data);
    });
  }

  onCrearAsignatura() {
  
    this.situacionService.insertarAsignatura(this.asignaturaID,this.departamentoID).subscribe( data => {
      console.log(data);
    });
  }

  onCrearCentro() {
  
    this.situacionService.insertarCentro(this.centroID).subscribe( data => {
      console.log(data);
    });
  }

  onEliminarGrupo() {
    
    this.situacionService.eliminarGrupo(this.grupoID).subscribe( data => {
      console.log(data);
    });
  }

  onEliminarGrado() {
  
    this.situacionService.eliminarGrado(this.gradoID,this.centroID).subscribe( data => {
      console.log(data);
    });
  }

  onEliminarDepartamento() {
  
    this.situacionService.eliminarDepartamento(this.departamentoID).subscribe( data => {
      console.log(data);
    });
  }

  onEliminarAsignatura() {
  
    this.situacionService.eliminarAsignatura(this.asignaturaID,this.departamentoID).subscribe( data => {
      console.log(data);
    });
  }

  onEliminarCentro() {
  
    this.situacionService.eliminarCentro(this.centroID).subscribe( data => {
      console.log(data);
    });
  }

}
