import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-doctors',
  templateUrl: './patient-doctors.component.html',
  styleUrls: ['./patient-doctors.component.css']
})
export class PatientDoctorsComponent implements OnInit{

  constructor(private patientService: PatientService, private doctorService: DoctorService, private router: Router) { }


  getSelectedFileUrl(username: string): string | null {
    if (this.myFiles[username]) {
      return URL.createObjectURL(this.myFiles[username]);
    }
    return null;
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType == "none" || this.loggedInUserType != "patient") {
      this.router.navigate(['/']);
      return;
    }

    this.doctorService.getAllDoctors().subscribe((data: Doctor[]) => {
      this.allDoctors = data;

      this.allDoctors.forEach(doctor => {
        
        this.doctorService.getImage(doctor.imagePath).subscribe((myBlob: any) => {
          console.log(myBlob);
          myBlob.name = 'image.myext';
          myBlob.lastModified = new Date();
          
          this.myFiles[doctor.username] = new File([myBlob], 'image.myex', {
            type: myBlob.type,
          });
        });
      });

      console.log(this.myFiles);
    })
  }

  loggedInUserType: string;
  loggedInUser: any;
  imagePath: string;


  myFiles: File[] = [];
  
  allDoctors: Doctor[];
  searchFirstname: string = "";
  searchLastname: string = "";
  searchSpecialization: string = "";
  searchBranch: string = "";

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/patient/doctors', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }

  sortByFirstnameAsc() {
    this.allDoctors.sort((a,b) => a.firstname.localeCompare(b.firstname));
  }

  sortByFirstnameDesc() {
    this.allDoctors.sort((a,b) => b.firstname.localeCompare(a.firstname));
  }

  sortByLastnameAsc() {
    this.allDoctors.sort((a,b) => a.lastname.localeCompare(b.lastname));
  }

  sortByLastnameDesc() {
    this.allDoctors.sort((a,b) => b.lastname.localeCompare(a.lastname));
  }

  sortBySpecializationAsc() {
    this.allDoctors.sort((a,b) => a.specialization.name.localeCompare(b.specialization.name));
  }
  
  sortBySpecializationDesc() {
    this.allDoctors.sort((a,b) => b.specialization.name.localeCompare(a.specialization.name));
  }

  sortByBranchAsc() {
    this.allDoctors.sort((a,b) => a.branch.localeCompare(b.branch));
  }

  sortByBranchDesc() {
    this.allDoctors.sort((a,b) => b.branch.localeCompare(a.branch));
  }

  search() {
    this.doctorService.search(this.searchFirstname, this.searchLastname, this.searchSpecialization, this.searchBranch).subscribe((data: Doctor[]) => {
      this.allDoctors = data;
      console.log(this.allDoctors);
    })
  }
}
