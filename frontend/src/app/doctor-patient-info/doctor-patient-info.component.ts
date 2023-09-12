import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Patient } from '../models/patient';
import { Report } from '../models/report';
import { Appointment } from '../models/appointment';
import { ReportService } from '../services/report.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupGenerateReportComponent } from '../popup-generate-report/popup-generate-report.component';

import * as $ from 'jquery';

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
  initMessage: string = "";
  initPositiveMessage: string = "";

  allReports: Report[];
  allPreviousAppointments: Appointment[];


  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType == "none" || this.loggedInUserType != "doctor") {
      this.router.navigate(['/']);
      return;
    }

    if(this.patient != null) {
      localStorage.setItem('patientInfo', JSON.stringify(this.patient));
    }
    else {
      this.patient = JSON.parse(localStorage.getItem('patientInfo'));
    }

    //see message for display
    if(localStorage.getItem('initMessage') == "cancelled") {
      this.initMessage = "Report generation cancelled!";
      localStorage.removeItem('initMessage');
      setTimeout(function() { document.getElementById('initMessage').style.display = "none" }, 3000);
    }

    if(localStorage.getItem('initPositiveMessage') == "success") {
      this.initPositiveMessage = "Report generated!";
      localStorage.removeItem('initPositiveMessage');
      setTimeout(function() { document.getElementById('initPositiveMessage').style.display = "none" }, 3000);
    }

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
      width: '500px',
      data: appointment,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.setItem('initPositiveMessage', "success");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['doctor/patientInfo']);
        });

      }
      else {
        localStorage.setItem('initMessage', "cancelled");
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['doctor/patientInfo']);
        });
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
