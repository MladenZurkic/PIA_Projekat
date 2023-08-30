import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';


  login(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/patients/login`, data);
  }

  checkUsername(username: string){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/patients/checkUsername`, data);
  }

  checkEmail(email: string){
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/patients/checkEmail`, data);
  }

  uploadImage(formData: FormData){

    console.log('Usli smo u servis!');
    console.log(formData.get('profilePicture'));
    console.log(formData.get('username'));


    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    // Include headers in your request options
    const options = { headers: headers };

    return this.http.post(`${this.uri}/patients/uploadImage`, formData, options);
  }


  register(username: string, password: string, firstname: string, lastname: string, address: string, phoneNumber: string, email: string, imagePath: string){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      imagePath: imagePath
    }

    return this.http.post(`${this.uri}/patients/register`, data);
  }


  getImage(path: string){
    return this.http.get(`${this.uri}/patients/getImage/?path=${path}`, { responseType: 'blob' });
  }

  changePassword(id: string, newPassword: string){
    const data = {
      id: id,
      newPassword: newPassword
    }

    return this.http.post(`${this.uri}/patients/changePassword`, data);
  }
}
