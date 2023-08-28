import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor';
import { Examination } from '../models/examination';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';
  
  
  login(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/managers/login`, data);
  }

  getAllPatients(){
    return this.http.get(`${this.uri}/managers/getAllPatients`);
  }

  approvePatient(patient: Patient){
    const data = {
      patient: patient
    }

    return this.http.post(`${this.uri}/managers/approvePatient`, data);
  }

  declinePatient(patient: Patient){
    const data = {
      patient: patient
    }

    return this.http.post(`${this.uri}/managers/declinePatient`, data);
  }

  editPatient(patient: Patient){
    const data = {
      patient: patient
    }

    return this.http.post(`${this.uri}/managers/editPatient`, data);
  }

  deletePatient(patient: Patient){
    const data = {
      patient: patient
    }

    return this.http.post(`${this.uri}/managers/deletePatient`, data);
  }

  getAllDoctors(){
    return this.http.get(`${this.uri}/managers/getAllDoctors`);
  }

  editDoctor(doctor: Doctor){
    const data = {
      doctor: doctor
    }

    return this.http.post(`${this.uri}/managers/editDoctor`, data);
  }

  deleteDoctor(doctor: Doctor){
    const data = {
      doctor: doctor
    }

    return this.http.post(`${this.uri}/managers/deleteDoctor`, data);
  }

  getAllExaminations(){
    return this.http.get(`${this.uri}/managers/getAllExaminations`);
  }

  approveExamination(examination: Examination){
    const data = {
      examination: examination
    }

    return this.http.post(`${this.uri}/managers/approveExamination`, data);
  }

  declineExamination(examination: Examination){
    const data = {
      examination: examination
    }

    return this.http.post(`${this.uri}/managers/declineExamination`, data);
  }
}
