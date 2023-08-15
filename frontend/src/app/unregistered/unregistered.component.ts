import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unregistered',
  templateUrl: './unregistered.component.html',
  styleUrls: ['./unregistered.component.css']
})
export class UnregisteredComponent implements OnInit{


  constructor(private doctorsService: DoctorService, private router: Router) { }

  loggedInUser: any;
  loggedInUserType: string;

  allDoctors: Doctor[];
  searchFirstname: string = "";
  searchLastname: string = "";
  searchSpecialization: string = "";

  ngOnInit(): void {

    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    this.doctorsService.getAllDoctors().subscribe((data: Doctor[]) => {
      this.allDoctors = data;
    });
  }
 
  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
    window.location.reload();
  }

  sortByFirstnameAsc() {
    this.allDoctors.sort((a,b) => a.firstname.localeCompare(b.firstname));
  }

  sortByFirstnameDesc() {
    this.allDoctors.sort((a,b) => b.firstname.localeCompare(a.firstname));
  }

  sortByLastnameAsc() {
    this.allDoctors.sort((a,b) => a.lastname.localeCompare(b.lastname));
  }

  sortByLastnameDesc() {
    this.allDoctors.sort((a,b) => b.lastname.localeCompare(a.lastname));
  }

  sortBySpecializationAsc() {
    this.allDoctors.sort((a,b) => a.specialization.name.localeCompare(b.specialization.name));
  }
  
  sortBySpecializationDesc() {
    this.allDoctors.sort((a,b) => b.specialization.name.localeCompare(a.specialization.name));
  }

  search() {
    this.doctorsService.search(this.searchFirstname, this.searchLastname, this.searchSpecialization, "").subscribe((data: Doctor[]) => {
      this.allDoctors = data;
      console.log(this.allDoctors);
    })
  }
}
