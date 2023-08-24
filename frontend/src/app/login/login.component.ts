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

  loggedInUser: any;
  loggedInUserType: string;
  
  username: string = "";
  password: string = "";
  message: string = "";

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";
  }


  login(){
    this.message = "";
    console.log(this.username);
    console.log(this.password);

    this.patientService.login(this.username, this.password).subscribe((response: any) => {
      if(response!=null){
        if(response['type'] == 'patient'){
          console.log(response);
          if(response["user"].status == "pending"){
            this.message = "Your account is pending approval!";
            return;
          }
          if(response.status == "declined"){
            this.message = "Your register request is declined!";
            return;
          }

          localStorage.setItem('loggedInUser', JSON.stringify(response['user']));
          localStorage.setItem('loggedInUserType', 'patient');
          this.router.navigate(['/patient']);
        }
        else if(response['type'] == 'doctor'){
          if(response["user"].status == "pending"){
            this.message = "Your account is pending approval!";
            return;
          }
          localStorage.setItem('loggedInUser', JSON.stringify(response['user']));
          localStorage.setItem('loggedInUserType', 'doctor');
          this.router.navigate(['/doctor']);
        }
        else {
          this.message = "Invalid username or password!";
        }
      }
      else{
        this.message = "Invalid username or password!";
      }
    })
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
