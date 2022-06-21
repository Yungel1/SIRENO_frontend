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
            alert("Se han ejecutado correctamente todas las entradas del CSV");
          },
          error: (e) => {
            if(e.error instanceof ProgressEvent){
              alert("Se ha editado el archivo, bórrelo e insértelo de nuevo");
            } else if(e.error.linea){
              let error = e.error.message+". Línea: "+e.error.linea
              alert(error);
            } else if(e.error.message){
              alert(e.error.message);
            } else{
              alert("Problemas de permisos con el archivo, inténtelo con otro")
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

    this.situacionService.insertarActualizarActivacion(situacion.idDocente,situacion.idGrupo,situacion.idGrado,situacion.idAsignatura,situacion.idCampana,idCampana).subscribe({next:dataAct => {
      console.log(dataAct);
      this.situacionService.insertarCampañaSituacion(situacion.id,idCampana).subscribe({ next: data => {
        console.log(data);
        this.ngOnInit();
      },
      });
    },
    error: (e) => {
      alert(e.error.message);
    }
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
    this.situacionService.eliminarActivacion(situacion.idDocente,situacion.idGrupo,situacion.idGrado,situacion.idAsignatura,situacion.idCampana).subscribe( dataAct => {
      console.log(dataAct);
      this.situacionService.eliminarSituacion(situacion.id).subscribe( data => {
        console.log(data);
        this.ngOnInit();
      });
    })

  }

  onCrearGrupo() {
    
    this.situacionService.insertarGrupo(this.grupoID).subscribe({next: data => {
      console.log(data);
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

  onCrearGrado() {
  
    this.situacionService.insertarGrado(this.gradoID,this.centroGradoID).subscribe({ next: data => {
      console.log(data);
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

  onCrearDepartamento() {
  
    this.situacionService.insertarDepartamento(this.departamentoID).subscribe({next: data => {
      console.log(data);
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

  onCrearAsignatura() {
  
    this.situacionService.insertarAsignatura(this.asignaturaID,this.departamentoAsignaturaID).subscribe({next: data => {
      console.log(data);
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

  onCrearCentro() {
  
    this.situacionService.insertarCentro(this.centroID).subscribe({next: data => {
      console.log(data);
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

  onEliminarGrupo() {
    
    this.situacionService.eliminarGrupo(this.grupoID).subscribe({next: data => {
      console.log(data);
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

  onEliminarGrado() {
  
    this.situacionService.eliminarGrado(this.gradoDeleteID).subscribe({next: data => {
      console.log(data);
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

  onEliminarDepartamento() {
  
    this.situacionService.eliminarDepartamento(this.departamentoID).subscribe({next: data => {
      console.log(data);
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

  onEliminarAsignatura() {
  
    this.situacionService.eliminarAsignatura(this.asignaturaDeleteID).subscribe({next: data => {
      console.log(data);
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

  onEliminarCentro() {
  
    this.situacionService.eliminarCentro(this.centroID).subscribe({next: data => {
      console.log(data);
    },
    error: (e) => {
      alert(e.error.message);
    }
    });
  }

}
