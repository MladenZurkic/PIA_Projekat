import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService) { }

  loggedInUserType: string;
  loggedInUser: Patient;

  allAppointments: Appointment[];

  ngOnInit(): void {
    this.loggedInUserType = localStorage.getItem('loggedInUserType');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    this.appointmentService.getAllAppointmentsByPatient(this.loggedInUser).subscribe((appointments: Appointment[]) => { 
      this.allAppointments = appointments;
      console.log(this.allAppointments.length);
    });
  }


  getDoctorNameFromUsername(username: string) { 
    return username;
  }
}
