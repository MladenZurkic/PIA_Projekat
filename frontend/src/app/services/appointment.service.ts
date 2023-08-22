import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Appointment } from '../models/appointment';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllAppointmentsByDoctor(doctor: Doctor) {
    const data = {
      doctor: doctor
    }
    return this.http.post(`${this.uri}/appointments/getAllAppointmentsByDoctor`, data);
  }

  getAllAppointmentsByPatient(patient: Patient) {
    const data = {
      patient: patient
    }
    return this.http.post(`${this.uri}/appointments/getAllAppointmentsByPatient`, data);
  }

  saveAppointment(appointment: Appointment) {
    const data = {
      appointment: appointment
    }
    return this.http.post(`${this.uri}/appointments/saveAppointment`, data);
  }

  cancelAppointment(appointment: Appointment) {
    const data = {
      appointment: appointment
    }
    return this.http.post(`${this.uri}/appointments/cancelAppointment`, data);
  }

  getAllReportsByPatient(patient: Patient) {
    const data = {
      patient: patient
    }
    return this.http.post(`${this.uri}/appointments/getAllReportsByPatient`, data);
  }

  getAllAppointmentsForPatientAndDoctor(patient: Patient, doctor: Doctor) {
    const data = {
      patient: patient,
      doctor: doctor
    }
    return this.http.post(`${this.uri}/appointments/getAllAppointmentsForPatientAndDoctor`, data);
  }
}
