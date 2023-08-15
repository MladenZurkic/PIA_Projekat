import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Examination } from '../models/examination';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllDoctors() {
    return this.http.get(`${this.uri}/doctors/getAllDoctors`);
  }

  search(firstname: string, lastname: string, specialization: string, branch: string) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      specialization: specialization,
      branch: branch
    }
    
    return this.http.post(`${this.uri}/doctors/search/`, data);
  }

  getDoctorByUsername(doctorUsername: string) {
    const data = {
      doctorUsername: doctorUsername
    }
    return this.http.post(`${this.uri}/doctors/getDoctorByUsername/`, data);
  }

  getImage(path: string){
    return this.http.get(`${this.uri}/doctors/getImage/?path=${path}`, { responseType: 'blob' });
  }

  addExaminationToDoctor(doctor: Doctor, examination: Examination) {
    const data = {
      doctor: doctor,
      examination: examination
    }
    return this.http.post(`${this.uri}/doctors/addExaminationToDoctor/`, data);
  }

  removeExaminationFromDoctor(doctor: Doctor, examination: Examination) {
    const data = {
      doctor: doctor,
      examination: examination
    }
    return this.http.post(`${this.uri}/doctors/removeExaminationFromDoctor/`, data);
  }
}
