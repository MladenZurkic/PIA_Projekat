import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';


  getAllReportsForPatient(patient: Patient){
    const data = {
      patient: patient
    }

    return this.http.post(`${this.uri}/reports/getAllReportsForPatient`, data);
  }


  saveReport(report: any) {
    const data = {
      report: report
    }

    return this.http.post(`${this.uri}/reports/saveReport`, data);
  }
}
