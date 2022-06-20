import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { SituacionService } from 'src/app/services/situacion.service';
import { Situacion } from 'src/app/models/situacion.model';

@Component({
  selector: 'app-situacion',
  templateUrl: './situacion.component.html',
  styleUrls: ['./situacion.component.css']
})
export class SituacionComponent implements OnInit {

  fileToUpload: File | null = null;
  fileName: string = '';
  file: File | null = null;

  situaciones: Situacion[] = [];
  selectedSituacion?: Situacion;

  grupoID: string = "";
  centroID: string = "";
  gradoID: string = "";
  departamentoID: string = "";
  asignaturaID: string = "";
  asignaturaDeleteID: string = "";
  gradoDeleteID: string = "";
  centroGradoID: string = "";
  departamentoAsignaturaID: string = "";

  campanas: string[] = [];

  constructor(private fileUploadService: FileUploadService, private situacionService: SituacionService) { }

  ngOnInit(): void {
    this.getSituacionInfo();
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
          next: () => {
            this.ngOnInit();
          },
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

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onInsertarCampana(situacion: Situacion,idCampana: string) {
    this.situacionService.insertarCampañaSituacion(situacion.id,idCampana).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  getSituacionInfo(){

    let situacionInfo: Situacion; 

    this.situacionService.getSituaciones().subscribe( situaciones => {
      let situacionesJSON = JSON.parse(JSON.stringify(situaciones));
      this.situaciones = [];
      situacionesJSON.forEach((situacion: { id: string; idGrado: string; idDocente: string; idGrupo: string; idAsignatura: string; idCampaña: string; }) => {
        situacionInfo = {
          id: situacion.id,
          idGrado: situacion.idGrado,
          idDocente: situacion.idDocente,
          idGrupo: situacion.idGrupo,
          idAsignatura: situacion.idAsignatura,
          idCampana: situacion.idCampaña,
        }

        this.situaciones.push(situacionInfo);
      })
    });
  }

  sortSituaciones() {
    return this.situaciones = this.situaciones.sort((a, b) => a.id > b.id ? 1 : -1);
  }

  onDeleteSituacion(situacion: Situacion) {
    this.situacionService.eliminarSituacion(situacion.id).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  onCrearGrupo() {
    
    this.situacionService.insertarGrupo(this.grupoID).subscribe( data => {
      console.log(data);
    });
  }

  onCrearGrado() {
  
    this.situacionService.insertarGrado(this.gradoID,this.centroGradoID).subscribe( data => {
      console.log(data);
    });
  }

  onCrearDepartamento() {
  
    this.situacionService.insertarDepartamento(this.departamentoID).subscribe( data => {
      console.log(data);
    });
  }

  onCrearAsignatura() {
  
    this.situacionService.insertarAsignatura(this.asignaturaID,this.departamentoAsignaturaID).subscribe( data => {
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
  
    this.situacionService.eliminarGrado(this.gradoDeleteID).subscribe( data => {
      console.log(data);
    });
  }

  onEliminarDepartamento() {
  
    this.situacionService.eliminarDepartamento(this.departamentoID).subscribe( data => {
      console.log(data);
    });
  }

  onEliminarAsignatura() {
  
    this.situacionService.eliminarAsignatura(this.asignaturaDeleteID).subscribe( data => {
      console.log(data);
    });
  }

  onEliminarCentro() {
  
    this.situacionService.eliminarCentro(this.centroID).subscribe( data => {
      console.log(data);
    });
  }

}
