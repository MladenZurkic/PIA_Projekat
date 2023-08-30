import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  saveExamination(examination: any) {
    const data = {
      examination: examination
    }
    return this.http.post(`${this.uri}/doctors/saveExamination/`, data);
  }

  uploadImage(formData: FormData){

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const options = { headers: headers };

    return this.http.post(`${this.uri}/doctors/uploadImage`, formData, options);
  }

  checkUsername(username: string){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/doctors/checkUsername`, data);
  }

  checkEmail(email: string){
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/doctors/checkEmail`, data);
  }

  register(username: string, password: string, firstname: string, lastname: string, address: string, phoneNumber: string, email: string, imagePath: string, licenceNumber: number, branch: string, specialization: string){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      imagePath: imagePath,
      licenceNumber: licenceNumber,
      branch: branch,
      specializationString: specialization
    }

    return this.http.post(`${this.uri}/doctors/register`, data);
  }

  changePassword(id: string, newPassword: string){
    const data = {
      id: id,
      newPassword: newPassword
    }

    return this.http.post(`${this.uri}/doctors/changePassword`, data);
  }
}
