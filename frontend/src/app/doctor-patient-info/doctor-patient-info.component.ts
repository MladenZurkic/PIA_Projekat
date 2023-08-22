import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Patient } from '../models/patient';
import { Report } from '../models/report';
import { Appointment } from '../models/appointment';
import { ReportService } from '../services/report.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupGenerateReportComponent } from '../popup-generate-report/popup-generate-report.component';

@Component({
  selector: 'app-doctor-patient-info',
  templateUrl: './doctor-patient-info.component.html',
  styleUrls: ['./doctor-patient-info.component.css']
})
export class DoctorPatientInfoComponent implements OnInit {

  constructor(private router: Router, private appointmentService: AppointmentService, private reportService: ReportService, public dialog: MatDialog) { 
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.patient = JSON.parse(this.routeState.patient)
      }
    }
  }

  patient: Patient;
  loggedInUserType: string;
  loggedInUser: any;
  routeState: any;

  allReports: Report[];
  allPreviousAppointments: Appointment[];

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    this.reportService.getAllReportsForPatient(this.patient).subscribe((reports: Report[]) => {
      console.log(reports);
      this.allReports = reports;
      this.allReports.sort((a, b) => {
        if(a.date < b.date) {
          return 1;
        } else if(a.date > b.date) {
          return -1;
        } else {
          if(a.time < b.time) {
            return 1;
          } else if(a.time > b.time) {
            return -1;
          } else {
            return 0;
          }
        }
      });

      this.appointmentService.getAllAppointmentsForPatientAndDoctor(this.patient, this.loggedInUser).subscribe((appointments: Appointment[]) => {
        this.allPreviousAppointments = appointments;
        this.allPreviousAppointments.sort((a, b) => {
          if(a.date < b.date) {
            return -1;
          } else if(a.date > b.date) {
            return 1;
          } else {
            if(a.time < b.time) {
              return -1;
            } else if(a.time > b.time) {
              return 1;
            } else {
              return 0;
            }
          }
        });

        for(let i = this.allPreviousAppointments.length - 1; i >= 0; i--) {
          if(this.allPreviousAppointments[i].status != "created") {
            this.allPreviousAppointments.splice(i, 1);
          }
        }

        for(let i = this.allPreviousAppointments.length - 1; i >= 0; i--) {
        
          let today = new Date();
          let appointmentDate = new Date(this.allPreviousAppointments[i].date);
          let timeHours = Number(this.allPreviousAppointments[i].time.split(":")[0]);
          let timeMinutes = Number(this.allPreviousAppointments[i].time.split(":")[1]);
          appointmentDate.setHours(timeHours, timeMinutes, 0, 0);
          console.log(appointmentDate);
          if(appointmentDate > today) {
            this.allPreviousAppointments.splice(i, 1);
          }
        }
        
      });
    });
  }

  generateReport(appointment: Appointment) {
    const dialogRef = this.dialog.open(PopupGenerateReportComponent, {
      width: '250px',
      data: {appointment: appointment}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
          console.log("RADI");
      }
      else {
        console.log("NE RADI");
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
}
