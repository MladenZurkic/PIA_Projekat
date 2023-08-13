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

  ngOnInit(): void {
  }

  username: string = "";
  password: string = "";

  message: string = "";

  login(){
    this.message = "";
    console.log(this.username);
    console.log(this.password);

    this.managerService.login(this.username, this.password).subscribe((response: any) => {
      if(response!=null){
        localStorage.setItem('loggedInUser', JSON.stringify(response['user']));
        localStorage.setItem('loggedInUserType', 'manager');
        this.router.navigate(['/patient']);
      }
      else{
        this.message = "Invalid username or password!";
      }
    })
  }
}
