import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnregisteredComponent } from './unregistered/unregistered.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {path: "", component: UnregisteredComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "patient", component: PatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
