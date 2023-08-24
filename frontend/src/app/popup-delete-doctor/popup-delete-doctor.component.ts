import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';
import { AppointmentService } from '../services/appointment.service';
import { Patient } from '../models/patient';
import { ManagerService } from '../services/manager.service';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-popup-delete-doctor',
  templateUrl: './popup-delete-doctor.component.html',
  styleUrls: ['./popup-delete-doctor.component.css']
})
export class PopupDeleteDoctorComponent {

  constructor(private cdRef: ChangeDetectorRef, private appointmentService: AppointmentService, private reportService: ReportService, public dialogRef: MatDialogRef<PopupDeleteDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Doctor, private managerService: ManagerService) { }
  
  
    doctor: Doctor;
  
    ngOnInit(): void {
      this.doctor = this.data;
    }
  
    cancel() {
      this.dialogRef.close();
    }
  
    delete() {
      this.managerService.deleteDoctor(this.doctor).subscribe((data: any) => {
        if(data['message']=='ok') {
          this.dialogRef.close("success");
        }
        else {
          this.dialogRef.close();
        }
      });

      this.dialogRef.close(true);
    }
}
