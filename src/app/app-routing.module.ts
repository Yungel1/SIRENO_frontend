import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "estudiante", component: EstudianteComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "encuestas", component: EncuestaComponent, pathMatch: "full", canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})

export class AppRoutingModule { }
