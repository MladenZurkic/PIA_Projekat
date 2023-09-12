import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  constructor(private patientService: PatientService, private router: Router, private doctorService: DoctorService, private managerService: ManagerService) { }

  loggedInUser: any;
  loggedInUserType: string;
  
  oldPassword: string = "";
  newPassword: string = "";
  newPasswordConfirm: string = "";
  
  message: string = "";
  positiveMessage: string = "";

  passwordPattern: RegExp = /^(?=.{8,14}$)(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?![A-Za-z\d!@#$%^&*]*([A-Za-z\d!@#$%^&*])\1)[A-Za-z].*$/;
  emailPattern: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType == "none") {
      this.router.navigate(['/']);
    }
  }

  changePassword() {
    if(this.loggedInUser.password != this.oldPassword) {
      this.message = "Old password is incorrect!";
      setTimeout(() => {
        this.message = "";
      }, 2000);
      return;
    }
    if(this.newPassword != this.newPasswordConfirm) {
      this.message = "New password and confirm password do not match!";
      setTimeout(() => {
        this.message = "";
      }, 2000);
      return;
    }

    if(this.passwordPattern.test(this.newPassword) == false){
      this.message = "Password must be 8-14 characters long, contain at least one uppercase letter, one number, and one special character and cannot contain repeating characters one after another";
      setTimeout(() => {
        this.message = "";
      }, 2000);
      return;
    }

    if(this.loggedInUserType == "patient") {
      this.patientService.changePassword(this.loggedInUser._id, this.newPassword).subscribe((response: any) => {
        if(response["message"] == "ok") {
          console.log(response["message"])
          this.positiveMessage = "Password changed successfully!";
          setTimeout(() => {
            this.positiveMessage = "";
          }, 2000);

          localStorage.setItem('loggedInUser', JSON.stringify(response["patient"]));
          this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
        }
        else {
          this.message = "Error occured while changing password!";
          setTimeout(() => {
            this.message = "";
          }, 2000);
        }
      });
    }
    else if(this.loggedInUserType == "doctor") {
      this.doctorService.changePassword(this.loggedInUser._id, this.newPassword).subscribe((response: any) => {
        if(response["message"] == "ok") {
          console.log(response["message"])
          this.positiveMessage = "Password changed successfully!";
          setTimeout(() => {
            this.positiveMessage = "";
          }, 2000);

          localStorage.setItem('loggedInUser', JSON.stringify(response["doctor"]));
          this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
        }
        else {
          this.message = "Error occured while changing password!";
          setTimeout(() => {
            this.message = "";
          }, 2000);
        }
      });
    }
    else {
      this.managerService.changePassword(this.loggedInUser._id, this.newPassword).subscribe((response: any) => {
        if(response["message"] == "ok") {
          console.log(response["message"])
          this.positiveMessage = "Password changed successfully!";
          setTimeout(() => {
            this.positiveMessage = "";
          }, 2000);

          localStorage.setItem('loggedInUser', JSON.stringify(response["manager"]));
          this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
        }
        else {
          this.message = "Error occured while changing password!";
          setTimeout(() => {
            this.message = "";
          }, 2000);
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/changePassword', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
