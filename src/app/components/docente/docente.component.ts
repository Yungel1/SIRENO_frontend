import { Component, OnInit } from '@angular/core';
import { CampañaService } from 'src/app/services/campaña.service';
import {Campaña} from "../../models/campaña.model";
import { Router } from '@angular/router';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  campanas: Campaña[] = [];
  selectedCampana?: Campaña;

  constructor(private campañaService: CampañaService,private router: Router) { }

  ngOnInit() {
    this.getCampañaInfo();
  }

  getCampañaInfo(): void {

    this.campañaService.getCampañasInformes().subscribe({next: campañaId => {

      let campañaJSON;
      let campañaInfo: Campaña;
      let campañaIdJSON = JSON.parse(JSON.stringify(campañaId));
      
      campañaIdJSON.forEach((campana: { idCampaña: string; }) => {
        this.campañaService.getCampañaInfoInformes(campana.idCampaña).subscribe(campaña => {
          campañaJSON = JSON.parse(JSON.stringify(campaña))[0];
          campañaInfo = {
            id: campana.idCampaña,
            idSituacion: "",
            nombre: campañaJSON.nombre,
            descripcion: campañaJSON.descripcion
          }

          this.campanas.push(campañaInfo);
        });
      });
    },
    error: (e) => {
      alert("No tienes ninguna campaña asociada");
      this.router.navigate(['/']);
    }
    });
  };
  
  sort() {
    return this.campanas = this.campanas.sort((a, b) => a.nombre > b.nombre ? 1 : -1);
  }

  onSelect(campaña: Campaña): void {
    this.selectedCampana = campaña;
    this.campañaPagina();
  }

  campañaPagina(): void {
   
    if(this.selectedCampana!=null){
   
      this.router.navigate(['/encuestasInformes'],{ queryParams: {idcampana: this.selectedCampana.id}});
    }
  }

  atras(): void {
    
    this.router.navigate(['/']);
  }

}
