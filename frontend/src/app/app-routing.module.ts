import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnregisteredComponent } from './unregistered/unregistered.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { ManagerComponent } from './manager/manager.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientDoctorsComponent } from './patient-doctors/patient-doctors.component';
import { PatientDoctorInfoComponent } from './patient-doctor-info/patient-doctor-info.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { DoctorMiscellaneousComponent } from './doctor-miscellaneous/doctor-miscellaneous.component';
import { DoctorPatientInfoComponent } from './doctor-patient-info/doctor-patient-info.component';

const routes: Routes = [
  {path: "", component: UnregisteredComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "patient", component: PatientComponent},
  {path: "managerlogin", component: LoginManagerComponent},
  {path: "manager", component: ManagerComponent},
  {path: "doctor", component: DoctorComponent},
  {path: "patient/doctors", component: PatientDoctorsComponent},
  {path: "patient/doctor/:username", component: PatientDoctorInfoComponent},
  {path: "patient/makeAppointment", component: MakeAppointmentComponent},
  {path: "patient/appointments", component: PatientAppointmentsComponent},
  {path: "doctor/appointments", component: DoctorAppointmentsComponent},
  {path: "doctor/miscellaneous", component: DoctorMiscellaneousComponent},
  {path: "doctor/patientInfo", component: DoctorPatientInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
