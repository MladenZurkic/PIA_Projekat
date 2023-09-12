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
import { PatientMakeAppointmentComponent } from './patient-make-appointment/patient-make-appointment.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { DoctorMiscellaneousComponent } from './doctor-miscellaneous/doctor-miscellaneous.component';
import { DoctorPatientInfoComponent } from './doctor-patient-info/doctor-patient-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupGenerateReportComponent } from './popup-generate-report/popup-generate-report.component';
import { PopupEditPatientComponent } from './popup-edit-patient/popup-edit-patient.component';
import { PopupDeletePatientComponent } from './popup-delete-patient/popup-delete-patient.component';
import { ManagerDoctorsComponent } from './manager-doctors/manager-doctors.component';
import { PopupDeleteDoctorComponent } from './popup-delete-doctor/popup-delete-doctor.component';
import { PopupEditDoctorComponent } from './popup-edit-doctor/popup-edit-doctor.component';
import { ManagerAddDoctorComponent } from './manager-add-doctor/manager-add-doctor.component';
import { ManagerRequestsComponent } from './manager-requests/manager-requests.component';
import { ManagerSpecsAndAppointmentsComponent } from './manager-specs-and-appointments/manager-specs-and-appointments.component';
import { PopupAddSpecializationComponent } from './popup-add-specialization/popup-add-specialization.component';
import { PopupAddExaminationComponent } from './popup-add-examination/popup-add-examination.component';
import { PopupEditExaminationComponent } from './popup-edit-examination/popup-edit-examination.component';
import { PopupDeleteExaminationComponent } from './popup-delete-examination/popup-delete-examination.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


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
    PatientMakeAppointmentComponent,
    DoctorAppointmentsComponent,
    DoctorMiscellaneousComponent,
    DoctorPatientInfoComponent,
    PopupGenerateReportComponent,
    PopupEditPatientComponent,
    PopupDeletePatientComponent,
    ManagerDoctorsComponent,
    PopupDeleteDoctorComponent,
    PopupEditDoctorComponent,
    ManagerAddDoctorComponent,
    ManagerRequestsComponent,
    ManagerSpecsAndAppointmentsComponent,
    PopupAddSpecializationComponent,
    PopupAddExaminationComponent,
    PopupEditExaminationComponent,
    PopupDeleteExaminationComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
