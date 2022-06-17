import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './guards/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { PreguntaRespuestaOpcionComponent } from './components/pregunta-respuesta-opcion/pregunta-respuesta-opcion.component';
import { DocenteComponent } from './components/docente/docente.component';
import { EncuestaInformeComponent } from './components/encuesta-informe/encuesta-informe.component';
import { PreguntaRespuestaOpcionInformeComponent } from './components/pregunta-respuesta-opcion-informe/pregunta-respuesta-opcion-informe.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EstudianteComponent,
    EncuestaComponent,
    PreguntaRespuestaOpcionComponent,
    DocenteComponent,
    EncuestaInformeComponent,
    PreguntaRespuestaOpcionInformeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
