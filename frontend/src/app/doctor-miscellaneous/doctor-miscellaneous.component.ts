import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-miscellaneous',
  templateUrl: './doctor-miscellaneous.component.html',
  styleUrls: ['./doctor-miscellaneous.component.css']
})
export class DoctorMiscellaneousComponent implements OnInit{

  constructor(private router: Router, private doctorService: DoctorService) { }

  loggedInUserType: string;
  loggedInUser: any;

  name: string;
  duration: number;
  price: number;
  message: string = "";
  positiveMessage: string = "";

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType == "none" || this.loggedInUserType != "doctor") {
      this.router.navigate(['/']);
      return;
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/patient', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }

  sendRequest() {
    this.message = "";
    this.positiveMessage = "";
    
    if(this.duration == null || this.name == null || this.price == null) {
      this.message = "All fields are required!";
      setTimeout(() => {
        this.message = "";
      }, 2000);
      return;
    }

    console.log(this.name);
    console.log(this.duration);
    console.log(this.price);

    let examination = {
      specialization: this.loggedInUser.specialization,
      name: this.name,
      duration: String(this.duration),
      price: String(this.price),
      status: "pending"
    }

    this.doctorService.saveExamination(examination).subscribe((data: any) => {
      if(data['message']=='ok') {
        this.positiveMessage = "Request successfully sent!";
        setTimeout(() => {
          this.positiveMessage = "";
        }, 2000);
      }
    });
  }
}
