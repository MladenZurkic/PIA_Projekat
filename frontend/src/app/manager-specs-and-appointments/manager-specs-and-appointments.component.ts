import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';
import { ManagerService } from '../services/manager.service';
import { MatDialog } from '@angular/material/dialog';
import { Examination } from '../models/examination';
import { Specialization } from '../models/specialization';
import { PopupAddSpecializationComponent } from '../popup-add-specialization/popup-add-specialization.component';
import { PopupEditExaminationComponent } from '../popup-edit-examination/popup-edit-examination.component';
import { PopupDeleteExaminationComponent } from '../popup-delete-examination/popup-delete-examination.component';
import { PopupAddExaminationComponent } from '../popup-add-examination/popup-add-examination.component';

@Component({
  selector: 'app-manager-specs-and-appointments',
  templateUrl: './manager-specs-and-appointments.component.html',
  styleUrls: ['./manager-specs-and-appointments.component.css']
})
export class ManagerSpecsAndAppointmentsComponent {

  constructor(private cdRef: ChangeDetectorRef, private router: Router, private doctorService: DoctorService, private managerService: ManagerService, public dialog: MatDialog) { }

  loggedInUser: any;
  loggedInUserType: string;
  
  allSpecializations: Specialization[];
  allExaminations: Examination[];
  itemsPerRow: number = 6;
  rowIndices: number[] = [];

  message: string;
  showMessage: boolean = false;

  initMessage: string = "";
  initPositiveMessage: string = "";

  selectedSpecialization: string = "";

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType == "none" || this.loggedInUserType != "manager") {
      this.router.navigate(['/']);
      return;
    }

    this.managerService.getAllSpecializations().subscribe((examinations: Examination[])=>{
      this.allSpecializations = examinations;
      
      for (let i = 0; i < Math.ceil(this.allSpecializations.length / this.itemsPerRow); i++) {
        this.rowIndices.push(i);
      }

      //see message for display
      if(localStorage.getItem('initMessage') == "cancelled adding specialization") {
        this.initMessage = "Adding Specialization cancelled or failed!";
        localStorage.removeItem('initMessage');
        setTimeout(function() { document.getElementById('initMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initPositiveMessage') == "success added specialization") {
        this.initPositiveMessage = "Specialization saved!";
        localStorage.removeItem('initPositiveMessage');
        setTimeout(function() { document.getElementById('initPositiveMessage').style.display = "none" }, 3000);
      }

      
      if(localStorage.getItem('initPositiveMessage') == "success edit") {
        this.initPositiveMessage = "Edit saved!";
        localStorage.removeItem('initPositiveMessage');
        setTimeout(function() { document.getElementById('initPositiveMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initMessage') == "cancelled edit") {
        this.initMessage = "Editing examination cancelled!";
        localStorage.removeItem('initMessage');
        setTimeout(function() { document.getElementById('initMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initMessage') == "cancelled delete") {
        this.initMessage = "Deleting Examination cancelled!";
        localStorage.removeItem('initMessage');
        setTimeout(function() { document.getElementById('initMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initPositiveMessage') == "success delete") {
        this.initPositiveMessage = "Examination deleted!";
        localStorage.removeItem('initPositiveMessage');
        setTimeout(function() { document.getElementById('initPositiveMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initMessage') == "cancelled adding examination") {
        this.initMessage = "Adding Examination cancelled or failed!";
        localStorage.removeItem('initMessage');
        setTimeout(function() { document.getElementById('initMessage').style.display = "none" }, 3000);
      }

      if(localStorage.getItem('initPositiveMessage') == "success added examination") {
        this.initPositiveMessage = "Examination saved!";
        localStorage.removeItem('initPositiveMessage');
        setTimeout(function() { document.getElementById('initPositiveMessage').style.display = "none" }, 3000);
      }

      this.managerService.getAllExaminations().subscribe((examinations: Examination[])=>{
        this.allExaminations = examinations;
        

      });
    });
  }

  showExamination(examination) {
    if(examination.status != "accepted") {
      return false;
    }
    if(examination.specialization.name == this.selectedSpecialization || this.selectedSpecialization == "") {
      return true;
    }
    else {
      return false;
    }
  }

  onDropdownChange(event: any) {
    this.selectedSpecialization = event.target.value;
  }

  getItemsForRow(rowIndex: number): Specialization[] {
    const startIndex = rowIndex * this.itemsPerRow;
    return this.allSpecializations.slice(startIndex, startIndex + this.itemsPerRow);
  }

  addSpecialization() {
    const dialogRef = this.dialog.open(PopupAddSpecializationComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('initPositiveMessage', "success added specialization");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/examinations']);
        });

      }
      else {
        localStorage.setItem('initMessage', "cancelled adding specialization");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/examinations']);
        });
      }
    });
  }

  addExamination() {
const dialogRef = this.dialog.open(PopupAddExaminationComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('initPositiveMessage', "success added examination");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/examinations']);
        });

      }
      else {
        localStorage.setItem('initMessage', "cancelled adding examination");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/examinations']);
        });
      }
    });
  }

  editExamination(examination: Examination) {
    const dialogRef = this.dialog.open(PopupEditExaminationComponent, {
      width: '700px',
      data: examination,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('initPositiveMessage', "success edit");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/examinations']);
        });

      }
      else {
        localStorage.setItem('initMessage', "cancelled edit");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/examinations']);
        });
      }
    });
  }

  deleteExamination(examination: Examination) {
    const dialogRef = this.dialog.open(PopupDeleteExaminationComponent, {
      width: '500px',
      data: examination,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('initPositiveMessage', "success delete");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/examinations']);
        });

      }
      else {
        localStorage.setItem('initMessage', "cancelled delete");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/examinations']);
        });
      }
    });
  }



  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/manager/examinations', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }

}
