import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../models/appointment';
import { Report } from '../models/report';
import { ReportService } from '../services/report.service';
import { AppointmentService } from '../services/appointment.service';
import { ManagerService } from '../services/manager.service';
import { Specialization } from '../models/specialization';

@Component({
  selector: 'app-popup-add-examination',
  templateUrl: './popup-add-examination.component.html',
  styleUrls: ['./popup-add-examination.component.css']
})
export class PopupAddExaminationComponent {

  constructor(private cdRef: ChangeDetectorRef, private appointmentService: AppointmentService, private reportService: ReportService, private managerService: ManagerService, public dialogRef: MatDialogRef<PopupAddExaminationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    
    name: string = "";
    duration: number = 30;
    price: number = 0;
    selectedSpecialization: string = "";

    allSpecializations: Specialization[];

    allFieldsRequired: string = "";
    showMessage: boolean = false;


    ngOnInit(): void {
      this.managerService.getAllSpecializations().subscribe((response: any) => {
        this.allSpecializations = response;
      });
    
    }

    onDropdownChange(event: any) {
      this.selectedSpecialization = event.target.value;
    }

    cancel() {
      this.dialogRef.close();
    }

    add() {
      if (this.name == "" || this.price == 0 || this.duration == 0 || this.selectedSpecialization == "") {
        this.allFieldsRequired = "All fields are required and must not be 0!";
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
          this.cdRef.detectChanges();
          }, 2000);
        return;
      }
      else {
        if(this.duration == null) {
          this.duration = 30;
        }
        this.managerService.addExamination(this.name, this.price, this.duration, this.selectedSpecialization).subscribe((response: any) => {
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
