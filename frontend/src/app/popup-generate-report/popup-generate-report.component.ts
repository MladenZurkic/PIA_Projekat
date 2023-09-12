import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../models/appointment';
import { Report } from '../models/report';
import { ReportService } from '../services/report.service';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-popup-generate-report',
  templateUrl: './popup-generate-report.component.html',
  styleUrls: ['./popup-generate-report.component.css']
})
export class PopupGenerateReportComponent {


  constructor(private cdRef: ChangeDetectorRef, private appointmentService: AppointmentService, private reportService: ReportService, public dialogRef: MatDialogRef<PopupGenerateReportComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Appointment) { }
  
  appointment: Appointment;
  reason: string;
  diagnosis: string;
  therapy: string;
  selectedDate: Date;
  allFieldsRequired: string = "";
  showMessage: boolean = false;

  ngOnInit() {
    this.appointment = this.data;
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if(this.reason == null || this.reason == "" || this.diagnosis == null || this.diagnosis == "" || this.therapy == null || this.therapy == "") {
      this.showMessage = true;
      setTimeout(() => { 
        this.showMessage = false;
        this.cdRef.detectChanges();
        }, 2000);
      return;
    }

    let report = {
      "patient": this.appointment.patient,
      "date": this.appointment.date,
      "time": this.appointment.time,
      "doctor": this.appointment.doctor,
      "specialization": this.appointment.doctor.specialization,
      "reason": this.reason,
      "diagnosis": this.diagnosis,
      "therapy": this.therapy,
      "dateOfAppointment": this.selectedDate
    }

    this.reportService.saveReport(report).subscribe((data: any) => {
      if(data['message']=='ok') {

        this.appointmentService.completeAppointment(this.appointment).subscribe((data: any) => {
          if(data['message']=='ok') {
            this.dialogRef.close("success");
          }
          else {
            this.dialogRef.close();
          }
        });
      }
      else {
        this.dialogRef.close();
      }
  });
  }
}
