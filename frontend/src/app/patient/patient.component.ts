import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{

  constructor(private patientService: PatientService, private router: Router) { }

  loggedInUserType: string;
  loggedInUser: any;
  imagePath: string;

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


    if(this.loggedInUserType == "none" || this.loggedInUserType != "patient") {
      this.router.navigate(['/']);
      return;
    }

    this.patientService.getImage(this.loggedInUser.imagePath).subscribe((myBlob: any) => {
      console.log(myBlob);
      myBlob.name = 'image.myext';
      myBlob.lastModified = new Date();
      
      this.myFile = new File([myBlob], 'image.myex', {
        type: myBlob.type,
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


}
