import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor';
import { Router } from '@angular/router';
import { Report } from '../models/report';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService, private router: Router) { }

  loggedInUserType: string;
  loggedInUser: any;

  allAppointments: Appointment[];
  allReports: Report[];

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    this.appointmentService.getAllAppointmentsByPatient(this.loggedInUser).subscribe((appointments: Appointment[]) => { 
      this.allAppointments = appointments;
      this.allAppointments.sort((a, b) => {
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


      for(let i = this.allAppointments.length - 1; i >= 0; i--) {
        
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let appointmentDate = new Date(this.allAppointments[i].date);
        appointmentDate.setHours(0, 0, 0, 0);
        //console.log(appointmentDate);
        if(appointmentDate < today) {
          this.allAppointments.splice(i, 1);
        }
      }

      console.log("LOGGED IN USER:");
      console.log(this.loggedInUser);
      //Reports
      this.appointmentService.getAllReportsByPatient(this.loggedInUser).subscribe((reports: Report[]) => {
        this.allReports = reports;
        console.log(this.allReports);
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
      });
    });
  }

  getDoctorNameFromUsername(username: string) { 
    return username;
  }

  showAppointment(appointment: Appointment) {
    if(appointment.status=="created") {
      return true;
    }
    return false;
  }

  cancelAppointment(appointment: Appointment) {
    //console.log(appointment);
    console.log("called cancel!");
    this.appointmentService.cancelAppointment(appointment).subscribe((data: any) => {
      
      //refresh page!
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['patient/appointments']);
      });
    });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/patient/appointmets', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
