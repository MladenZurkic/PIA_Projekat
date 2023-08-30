import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../models/appointment';
import { Report } from '../models/report';
import { ReportService } from '../services/report.service';
import { AppointmentService } from '../services/appointment.service';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-popup-add-specialization',
  templateUrl: './popup-add-specialization.component.html',
  styleUrls: ['./popup-add-specialization.component.css']
})
export class PopupAddSpecializationComponent {

  constructor(private cdRef: ChangeDetectorRef, private appointmentService: AppointmentService, private reportService: ReportService, private managerService: ManagerService, public dialogRef: MatDialogRef<PopupAddSpecializationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


    name: string = "";
    allFieldsRequired: string = "";
    showMessage: boolean = false;

    cancel() {
      this.dialogRef.close();
    }

    add() {
      if (this.name == "") {
        this.allFieldsRequired = "Name is required!";
        this.showMessage = true;
        setTimeout(() => { 
          this.showMessage = false;
          this.cdRef.detectChanges();
          }, 2000);
        return;
      }
      else {
        this.managerService.addSpecialization(this.name).subscribe((response: any) => {
          if(response.message == "ok") {
            this.dialogRef.close("ok");
          }
          else {
            this.dialogRef.close();
          }
        });
      }
    }
}
