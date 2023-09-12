import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';
import { ManagerService } from '../services/manager.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupDeleteDoctorComponent } from '../popup-delete-doctor/popup-delete-doctor.component';
import { PopupEditDoctorComponent } from '../popup-edit-doctor/popup-edit-doctor.component';
import { Examination } from '../models/examination';

@Component({
  selector: 'app-manager-requests',
  templateUrl: './manager-requests.component.html',
  styleUrls: ['./manager-requests.component.css']
})
export class ManagerRequestsComponent implements OnInit{

  constructor(private cdRef: ChangeDetectorRef, private router: Router, private doctorService: DoctorService, private managerService: ManagerService, public dialog: MatDialog) { }

  loggedInUser: any;
  loggedInUserType: string;
  
  allExaminations: Examination[];
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

    this.managerService.getAllExaminations().subscribe((examinations: Examination[])=>{
      this.allExaminations = examinations;

      for(let i= this.allExaminations.length - 1; i >= 0; i--){
        if(this.allExaminations[i].status != 'pending'){
          this.allExaminations.splice(i, 1);
        }
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

  approveExamination(examination: Examination){

    this.managerService.approveExamination(examination).subscribe((response: any)=>{
      if(response.message == "ok"){
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/requests']);
        });
      }
      else{
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

  declineExamination(examination: Examination){
    this.managerService.declineExamination(examination).subscribe((response: any)=>{
      if(response.message == "ok"){
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['manager/requests']);
        });
      }
      else{
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
}
