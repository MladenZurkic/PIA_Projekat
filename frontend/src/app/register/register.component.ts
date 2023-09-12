import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private patientService: PatientService, private router: Router) { }

  loggedInUser: any;
  loggedInUserType: string;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType != "none") {
      this.router.navigate(['/']);
      return;
    }
  }

  
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  firstname: string = "";
  lastname: string = "";
  address: string = "";
  phoneNumber: string = "";
  email: string = "";
  imagePath: string = "";

  message: string = "";
  positiveMessage: string = "";

  selectedFile: File = null;

  passwordPattern: RegExp = /^(?=.{8,14}$)(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?![A-Za-z\d!@#$%^&*]*([A-Za-z\d!@#$%^&*])\1)[A-Za-z].*$/;
  emailPattern: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  onSubmit() {
    if (!this.selectedFile) {
      console.log('No file selected');
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  register(){
    this.message = "";
    this.positiveMessage = "";

    if(this.username == "" || this.password == "" || this.confirmPassword == "" || this.firstname == "" || this.lastname == "" || this.address == "" || this.phoneNumber == "" || this.email == ""){
      this.message = "All fields are required!";
      setTimeout(() => {
        this.message = "";
      }, 2000);
      return;
    }
    
    if(this.password != this.confirmPassword){
      this.message = "Passwords do not match!";
      setTimeout(() => {
        this.message = "";
      }, 2000);
      return;
    }
    if(this.passwordPattern.test(this.password) == false){
      this.message = "Password must be 8-14 characters long, contain at least one uppercase letter, one number, and one special character and cannot contain repeating characters one after another";
      setTimeout(() => {
        this.message = "";
      }, 2000);
      return;
    }

    if(this.emailPattern.test(this.email) == false){
      this.message = "Invalid email!";
      setTimeout(() => {
        this.message = "";
      }, 2000);
      return;
    }

    this.patientService.checkUsername(this.username).subscribe((patient: Patient) => {
      if(patient!=null){
        this.message = "Username already exists";
        setTimeout(() => {
          this.message = "";
        }, 2000);
        return;
      }
      else {
        this.patientService.checkEmail(this.email).subscribe((patient: Patient) => {
        if(patient!=null) {
          this.message = "Email already exists";
          setTimeout(() => {
            this.message = "";
          }, 2000);
          return;
        }
        else {
          if(this.selectedFile) {
            if (!this.selectedFile.type.startsWith('image/') || !this.selectedFile.type.includes('jpeg') && !this.selectedFile.type.includes('png')) {
              this.message = 'Selected file is not an JPG/PNG image.';
              setTimeout(() => {
                this.message = "";
              }, 2000);
              return;
            }

            const img = new Image();
            img.src = URL.createObjectURL(this.selectedFile);
            img.onload = () => {
              const width = img.naturalWidth;
              const height = img.naturalHeight;
        
              if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {

                const formData = new FormData();
                formData.append('profilePicture', this.selectedFile); 
                formData.append('username', this.username); 
    
                this.patientService.uploadImage(formData).subscribe((res: any) => {
                  if(res['message'] == "Image uploaded successfully.") {
                    this.imagePath = res['imagePath'];
                    
                    this.patientService.register(this.username, this.password, this.firstname, this.lastname, this.address, this.phoneNumber, this.email, this.imagePath).subscribe((res2: any) => { 
                          if(res2['message'] == 'ok') {
                        console.log(res2['message']);
                        this.positiveMessage = "Registration successful!";
                        setTimeout(() => {
                          this.positiveMessage = "";
                        }, 2000);
                        return;
                      }
                      else {
                        console.log(res2['message']);
                        this.message = "Registration failed!";
                        setTimeout(() => {
                          this.message = "";
                        }, 2000);
                        return;
                      }
                    });
                  }
                });
              } else {
                this.message = 'Image size is not within the specified range (100x100px - 300x300px)';
                setTimeout(() => {
                  this.message = "";
                }, 2000);
                return;
              }
            };
          }
          else {
            //podrazumevana slika se koristi
            this.imagePath = "src\\uploads\\patients\\default-patient.png";
                    
            this.patientService.register(this.username, this.password, this.firstname, this.lastname, this.address, this.phoneNumber, this.email, this.imagePath).subscribe((res2: any) => { 
                  if(res2['message'] == 'ok') {
                console.log(res2['message']);
                this.positiveMessage = "Registration successful!";
                setTimeout(() => {
                  this.positiveMessage = "";
                }, 2000);
                return;
              }
              else {
                console.log(res2['message']);
                this.message = "Registration failed!";
                setTimeout(() => {
                  this.message = "";
                }, 2000);
                return;
              }
            });
          }
        }
        })
      }
    })
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/register', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
