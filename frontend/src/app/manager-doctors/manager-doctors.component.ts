import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';
import { ManagerService } from '../services/manager.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDeleteDoctorComponent } from '../popup-delete-doctor/popup-delete-doctor.component';
import { PopupEditDoctorComponent } from '../popup-edit-doctor/popup-edit-doctor.component';

@Component({
  selector: 'app-manager-doctors',
  templateUrl: './manager-doctors.component.html',
  styleUrls: ['./manager-doctors.component.css']
})
export class ManagerDoctorsComponent implements OnInit{

  constructor(private cdRef: ChangeDetectorRef, private router: Router, private doctorService: DoctorService, private managerService: ManagerService, public dialog: MatDialog) { }

  loggedInUser: any;
  loggedInUserType: string;
  
  allDoctors: Doctor[];
  message: string;
  showMessage: boolean = false;

  initMessage: string = "";
  initPositiveMessage: string = "";

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    this.managerService.getAllDoctors().subscribe((doctors: Doctor[]) => {
      this.allDoctors = doctors;
      
      //see message for display
      if(localStorage.getItem('initMessage') == "cancelled edit") {
        this.initMessage = "Editing doctor cancelled!";
        localStorage.removeItem('initMessage');
        setTimeout(function() { document.getElementById('initMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initMessage') == "cancelled delete") {
        this.initMessage = "Deleting doctor cancelled!";
        localStorage.removeItem('initMessage');
        setTimeout(function() { document.getElementById('initMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initPositiveMessage') == "success edit") {
        this.initPositiveMessage = "Edit saved!";
        localStorage.removeItem('initPositiveMessage');
        setTimeout(function() { document.getElementById('initPositiveMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initPositiveMessage') == "success delete") {
        this.initPositiveMessage = "Doctor deleted!";
        localStorage.removeItem('initPositiveMessage');
        setTimeout(function() { document.getElementById('initPositiveMessage').style.display = "none" }, 3000);
      }
    });
      
  }

  editDoctor(doctor: Doctor) {
    const dialogRef = this.dialog.open(PopupEditDoctorComponent, {
      width: '700px',
      data: doctor,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('initPositiveMessage', "success edit");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/doctors']);
        });

      }
      else {
        localStorage.setItem('initMessage', "cancelled edit");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/doctors']);
        });
      }
    });
  }

  deleteDoctor(doctor: Doctor) {
    const dialogRef = this.dialog.open(PopupDeleteDoctorComponent, {
      width: '500px',
      data: doctor,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('initPositiveMessage', "success delete");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/doctors']);
        });

      }
      else {
        localStorage.setItem('initMessage', "cancelled delete");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/doctors']);
        });
      }
    });
  }

  addDoctor() {
    this.router.navigate(['/manager/add-doctor']);
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
