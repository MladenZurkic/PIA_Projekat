import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialization } from '../models/specialization';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';
  
  getAllExaminationsForSpecialization(specialization: Specialization){
    const data = {
      specialization: specialization
    }
    return this.http.post(`${this.uri}/doctors/getAllExaminationsForSpecialization`, data);
  }
}
