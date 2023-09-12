
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { ManagerService } from '../services/manager.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupEditPatientComponent } from '../popup-edit-patient/popup-edit-patient.component';
import { PopupDeletePatientComponent } from '../popup-delete-patient/popup-delete-patient.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit{

  constructor(private router: Router, private managerService: ManagerService, private cdRef: ChangeDetectorRef, public dialog: MatDialog) { }

  loggedInUser: any;
  loggedInUserType: string;

  allPatients: Patient[];
  message: string;
  showMessage: boolean = false;

  initMessage: string = "";
  initPositiveMessage: string = "";
  
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType == "none" || this.loggedInUserType != "manager") {
      this.router.navigate(['/']);
      return;
    }

    this.managerService.getAllPatients().subscribe((patients: Patient[]) => {
      this.allPatients = patients;

      //see message for display
      if(localStorage.getItem('initMessage') == "cancelled edit") {
        this.initMessage = "Editing patient cancelled!";
        localStorage.removeItem('initMessage');
        setTimeout(function() { document.getElementById('initMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initMessage') == "cancelled delete") {
        this.initMessage = "Deleting patient cancelled!";
        localStorage.removeItem('initMessage');
        setTimeout(function() { document.getElementById('initMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initPositiveMessage') == "success edit") {
        this.initPositiveMessage = "Edit saved!";
        localStorage.removeItem('initPositiveMessage');
        setTimeout(function() { document.getElementById('initPositiveMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initPositiveMessage') == "success delete") {
        this.initPositiveMessage = "Patient deleted!";
        localStorage.removeItem('initPositiveMessage');
        setTimeout(function() { document.getElementById('initPositiveMessage').style.display = "none" }, 3000);
      }


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

  showNotApproved(patient: Patient) {
    if (patient.status == "pending") {
      return true;
    }
    return false;
  }

  showApproved(patient: Patient) {
    if (patient.status == "approved") {
      return true;
    }
    return false;
  }

  approvePatient(patient: Patient) {
    this.message = "";

    this.managerService.approvePatient(patient).subscribe((response: any) => {
      if (response['message'] == "ok") {
          
        //refresh page!
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager']);
        });
      }
      else {
        this.message = "Error!";
        this.showMessage = true;
      setTimeout(() => { 
        this.message = "";
        this.showMessage = false;
        this.cdRef.detectChanges();
        }, 2000);
      return;
      }
    });
  }

  declinePatient(patient: Patient) {
    this.message = "";

    this.managerService.declinePatient(patient).subscribe((response: any) => {
      if (response['message'] == "ok") {
          
        //refresh page!
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager']);
        });
      }
      else {
        this.message = "Error!";
        this.showMessage = true;
      setTimeout(() => { 
        this.message = "";
        this.showMessage = false;
        this.cdRef.detectChanges();
        }, 2000);
      return;
      }
    });
  }

  editPatient(patient: Patient) {
    const dialogRef = this.dialog.open(PopupEditPatientComponent, {
      width: '700px',
      data: patient,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('initPositiveMessage', "success edit");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager']);
        });

      }
      else {
        localStorage.setItem('initMessage', "cancelled edit");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager']);
        });
      }
    });
  }

  deletePatient(patient: Patient) {
    const dialogRef = this.dialog.open(PopupDeletePatientComponent, {
      width: '500px',
      data: patient,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('initPositiveMessage', "success delete");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager']);
        });

      }
      else {
        localStorage.setItem('initMessage', "cancelled delete");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager']);
        });
      }
    });
  }
}
