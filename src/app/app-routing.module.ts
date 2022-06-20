import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { PreguntaRespuestaOpcionComponent } from './components/pregunta-respuesta-opcion/pregunta-respuesta-opcion.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { DocenteComponent } from './components/docente/docente.component';
import { EncuestaInformeComponent } from './components/encuesta-informe/encuesta-informe.component';
import { PreguntaRespuestaOpcionInformeComponent } from './components/pregunta-respuesta-opcion-informe/pregunta-respuesta-opcion-informe.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "estudiante", component: EstudianteComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "docente", component: DocenteComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "encuestas", component: EncuestaComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "encuestasInformes", component: EncuestaInformeComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "preguntas", component: PreguntaRespuestaOpcionComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "administrador", component: AdministradorComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "preguntasInformes", component: PreguntaRespuestaOpcionInformeComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "preguntasencuesta", component: PreguntasComponent, pathMatch: "full", canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})

export class AppRoutingModule { }
