import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { ManagerService } from '../services/manager.service';
import { Manager } from '../models/manager';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.css']
})
export class LoginManagerComponent {
  constructor(private managerService: ManagerService, private router: Router) { }
  
  loggedInUser: any;
  loggedInUserType: string;
  
  username: string = "";
  password: string = "";
  message: string = "";

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType != "none") {
      this.router.navigate(['/']);
      return;
    }
  }

  login(){
    this.message = "";
    console.log(this.username);
    console.log(this.password);

    this.managerService.login(this.username, this.password).subscribe((response: any) => {
      if(response!=null){
        if(response['type'] == 'none'){
          this.message = "Invalid username or password!";
          return;
        }
        localStorage.setItem('loggedInUser', JSON.stringify(response['user']));
        localStorage.setItem('loggedInUserType', 'manager');
        this.router.navigate(['/manager']);
      }
      else{
        this.message = "Invalid username or password!";
      }
    })
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/managerLogin', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
