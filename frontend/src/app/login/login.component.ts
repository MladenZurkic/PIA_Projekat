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

    this.patientService.login(this.username, this.password).subscribe((response: any) => {
      if(response!=null){
        if(response['type'] == 'patient'){
          if(response.status == "pending"){
            this.message = "Your account is pending approval!";
            return;
          }

          localStorage.setItem('loggedInUser', JSON.stringify(response['user']));
          localStorage.setItem('loggedInUserType', 'patient');
          this.router.navigate(['/patient']);
        }
        else {
          localStorage.setItem('loggedInUser', JSON.stringify(response['user']));
          localStorage.setItem('loggedInUserType', 'doctor');
          this.router.navigate(['/doctor']);
        }
      }
      else{
        this.message = "Invalid username or password!";
      }
    })
  }
}
