import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';
import { AppointmentService } from '../services/appointment.service';
import { Patient } from '../models/patient';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-popup-delete-patient',
  templateUrl: './popup-delete-patient.component.html',
  styleUrls: ['./popup-delete-patient.component.css']
})
export class PopupDeletePatientComponent {

  constructor(private cdRef: ChangeDetectorRef, private appointmentService: AppointmentService, private reportService: ReportService, public dialogRef: MatDialogRef<PopupDeletePatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient, private managerService: ManagerService) { }
  
  
    patient: Patient;
  
    ngOnInit(): void {
      this.patient = this.data;
    }
  
    cancel() {
      this.dialogRef.close();
    }
  
    delete() {
      this.managerService.deletePatient(this.patient).subscribe((data: any) => {
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
