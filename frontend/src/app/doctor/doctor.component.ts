import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { ExaminationService } from '../services/examination.service';
import { Examination } from '../models/examination';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{

  constructor(private router: Router, private doctorService: DoctorService, private examinationService: ExaminationService) { }

  loggedInUser: any;
  loggedInUserType: string;
  imagePath: string;
  allPossibleExaminations: Examination[];

  myFile: File;

  getSelectedFileUrl(): string | null {
    if (this.myFile) {
      return URL.createObjectURL(this.myFile);
    }
    return null;
  }

  
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType == "none" || this.loggedInUserType != "doctor") {
      this.router.navigate(['/']);
      return;
    }

    this.doctorService.getDoctorByUsername(this.loggedInUser.username).subscribe((doctor: Doctor) => {
      //Change localStorage if needed
      console.log(doctor);
      this.loggedInUser = doctor;
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
      
      this.doctorService.getImage(this.loggedInUser.imagePath).subscribe((myBlob: any) => {
        console.log(myBlob);
        myBlob.name = 'image.myext';
        myBlob.lastModified = new Date();
        
        this.myFile = new File([myBlob], 'image.myex', {
          type: myBlob.type,
        });
  
        this.examinationService.getAllExaminationsForSpecialization(this.loggedInUser.specialization).subscribe((examinations: Examination[]) => {
          this.allPossibleExaminations = examinations;
          console.log(this.loggedInUser.examinations);
  
          for(let i = this.allPossibleExaminations.length - 1; i >= 0; i--) {
            console.log(this.allPossibleExaminations[i]);
            if(this.loggedInUser.examinations.some((examination: Examination) => examination._id === this.allPossibleExaminations[i]._id)) {
              this.allPossibleExaminations.splice(i, 1);
            }
          }
          console.log(this.allPossibleExaminations);
        });
      });
    });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/patient', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }

  addExaminationToDoctor(examination: Examination) {
    this.doctorService.addExaminationToDoctor(this.loggedInUser, examination).subscribe((doctor: Doctor) => {
      this.loggedInUser = doctor;
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
      
      //refresh page!
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/doctor']);
      });
    });
  }

  removeExaminationFromDoctor(examination: Examination) {

    this.doctorService.removeExaminationFromDoctor(this.loggedInUser, examination).subscribe((doctor: Doctor) => {
      this.loggedInUser = doctor;
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
      
      //refresh page!
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/doctor']);
      });
    });
  }
}
