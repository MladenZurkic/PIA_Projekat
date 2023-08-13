import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{

  constructor(private patientService: PatientService) { }

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
    this.loggedInUserType = localStorage.getItem('loggedInUserType');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    this.patientService.getImage(this.loggedInUser.imagePath).subscribe((myBlob: any) => {
      console.log(myBlob);
      myBlob.name = 'image.myext';
      myBlob.lastModified = new Date();
      
      this.myFile = new File([myBlob], 'image.myex', {
        type: myBlob.type,
      });
    });
  }




}
