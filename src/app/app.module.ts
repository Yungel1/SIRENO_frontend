import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './guards/auth.guard';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { PreguntaRespuestaOpcionComponent } from './components/pregunta-respuesta-opcion/pregunta-respuesta-opcion.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocenteComponent } from './components/docente/docente.component';
import { EncuestaInformeComponent } from './components/encuesta-informe/encuesta-informe.component';
import { PreguntaRespuestaOpcionInformeComponent } from './components/pregunta-respuesta-opcion-informe/pregunta-respuesta-opcion-informe.component';
import { CampanaComponent } from './components/campana/campana.component';
import { SituacionComponent } from './components/situacion/situacion.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EstudianteComponent,
    EncuestaComponent,
    PreguntaRespuestaOpcionComponent,
    AdministradorComponent,
    DocenteComponent,
    EncuestaInformeComponent,
    PreguntaRespuestaOpcionInformeComponent,
    CampanaComponent,
    SituacionComponent,
    PreguntasComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [CookieService,AuthGuard,DatePipe,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
