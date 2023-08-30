import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit{

    constructor(private router: Router, private doctorService: DoctorService, private appointmentService: AppointmentService) { }
  
    loggedInUser: any;
    loggedInUserType: string;
    allAppointments: Appointment[];

    ngOnInit(): void {
      this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
      this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

      if(this.loggedInUserType == "none" || this.loggedInUserType != "doctor") {
        this.router.navigate(['/']);
        return;
      }

      this.appointmentService.getAllAppointmentsByDoctor(this.loggedInUser).subscribe((appointments: Appointment[]) => {
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
          if(this.allAppointments[i].status != "created") {
            this.allAppointments.splice(i, 1);
          }
        }

        //izbaci sve koji su prosli
        for(let i = this.allAppointments.length - 1; i >= 0; i--) {
        
          let today = new Date();
          let appointmentDate = new Date(this.allAppointments[i].date);
          let timeHours = Number(this.allAppointments[i].time.split(":")[0]);
          let timeMinutes = Number(this.allAppointments[i].time.split(":")[1]);
          appointmentDate.setHours(timeHours, timeMinutes, 0, 0);
          console.log(appointmentDate);
          if(appointmentDate < today) {
            this.allAppointments.splice(i, 1);
          }
        }

        if(this.allAppointments.length > 3) {
          this.allAppointments.splice(3);
        }
      });

    }
  
    cancelAppointment(appointment: Appointment) {
      //console.log(appointment);
      console.log("called cancel!");
      this.appointmentService.cancelAppointment(appointment).subscribe((data: any) => {
        
        //refresh page!
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['doctor/appointments']);
        });
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

    seePatientInfo(appointment) {
      console.log(appointment);  
      this.router.navigate(['/doctor/patientInfo'], {
          state: {
            patient: JSON.stringify(appointment.patient),
          }
        });
      }
}
