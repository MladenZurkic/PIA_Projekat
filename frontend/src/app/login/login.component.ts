import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string = "";
  password: string = "";

  message: string = "";

  login(){
    this.message = "";
    console.log(this.username);
    console.log(this.password);

    this.patientService.login(this.username, this.password).subscribe((patient: Patient) => {
      if(patient!=null){
        if(patient.status == "pending"){
          this.message = "Your account is pending approval!";
          return;
        }
        localStorage.setItem('patient', JSON.stringify(patient));
        this.router.navigate(['/patient']);
      }
      else{
        this.message = "Invalid username or password!";
      }
    })
  }
}
