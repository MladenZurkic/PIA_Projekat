import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-patient-doctor-info',
  templateUrl: './patient-doctor-info.component.html',
  styleUrls: ['./patient-doctor-info.component.css']
})
export class PatientDoctorInfoComponent implements OnInit{

  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private router: Router) { }

  doctor: Doctor;
  loggedInUserType: string;
  loggedInUser: any;
  imagePath: string;
  doctorUsername: string;

  myFile: File;

  getSelectedFileUrl(): string | null {
    if (this.myFile) {
      return URL.createObjectURL(this.myFile);
    }
    return null;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.doctorUsername = params.get('username');
    });
    
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType == "none" || this.loggedInUserType != "patient") {
      this.router.navigate(['/']);
      return;
    }
    
    this.doctorService.getDoctorByUsername(this.doctorUsername).subscribe((doctor: Doctor) => {
      if(doctor!=null) {
        this.doctor = doctor;

        this.doctorService.getImage(this.doctor.imagePath).subscribe((myBlob: any) => {
          console.log(myBlob);
          myBlob.name = 'image.myext';
          myBlob.lastModified = new Date();
          
          this.myFile = new File([myBlob], 'image.myex', {
            type: myBlob.type,
          });
          console.log(this.doctor);
          console.log(this.doctor.examinations[0].name);
        });
      }
    });
  }


  makeAppointment() {
    this.router.navigate(['/patient/makeAppointment'], {
      state: {
        doctor: JSON.stringify(this.doctor)
      }
    });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/patient/doctor/:username', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
