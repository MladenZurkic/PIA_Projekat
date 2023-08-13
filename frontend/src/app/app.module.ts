import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnregisteredComponent } from './unregistered/unregistered.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { ManagerComponent } from './manager/manager.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientDoctorsComponent } from './patient-doctors/patient-doctors.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { PatientDoctorInfoComponent } from './patient-doctor-info/patient-doctor-info.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';



@NgModule({
  declarations: [
    AppComponent,
    UnregisteredComponent,
    RegisterComponent,
    LoginComponent,
    PatientComponent,
    LoginManagerComponent,
    ManagerComponent,
    DoctorComponent,
    PatientDoctorsComponent,
    PatientAppointmentsComponent,
    PatientDoctorInfoComponent,
    MakeAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
