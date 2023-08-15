import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit{

  constructor() { }

  loggedInUser: any;
  loggedInUserType: string;
  
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";
  }

}
