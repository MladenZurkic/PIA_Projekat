import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { Router } from '@angular/router';
import { Examination } from '../models/examination';
import { Time } from '@angular/common';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-patient-make-appointment',
  templateUrl: './patient-make-appointment.component.html',
  styleUrls: ['./patient-make-appointment.component.css']
})
export class PatientMakeAppointmentComponent implements OnInit{

  constructor(private router: Router, private appointmentService: AppointmentService) { 
    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      if (this.routeState) {
        this.doctor = JSON.parse(this.routeState.doctor)
      }
    }
  }

  doctor: Doctor;
  loggedInUserType: string;
  loggedInUser: any;
  routeState: any;

  examination: any;
  selectedDate: Date;
  selectedTime: Time;
  message: string = "";
  positiveMessage: string = "";


  flag: boolean = false;
  potentialStartingTime: Date;
  potentialEndingTime: Date;
  previousEndingTime: Date;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser')) : "";
    this.loggedInUserType = localStorage.getItem('loggedInUserType') ? localStorage.getItem('loggedInUserType') : "none";

    if(this.loggedInUserType == "none" || this.loggedInUserType != "patient") {
      this.router.navigate(['/']);
      return;
    }
  }

  showExamination(examination: Examination) {
    if(examination.status == 'accepted') {
      return true;
    }
    return false;
  }

  saveAppointment() {
    this.message = "";
    this.positiveMessage = "";
    this.flag = false;
    this.potentialStartingTime = undefined;
    this.potentialEndingTime = undefined;
    this.previousEndingTime = undefined;

    if(this.examination == undefined || this.selectedDate == undefined || this.selectedTime == undefined) {
      this.message = "Please select examination, date and time!";
      return;
    }
    this.appointmentService.getAllAppointmentsByDoctor(this.doctor).subscribe((appointments: Appointment[]) => {
      console.log("Appointments za ovog doktora:");
      console.log(appointments);

      appointments.sort((a, b) => {
        if(a.date < b.date) {
          return -1;
        } else if(a.date > b.date) {
          return 1;
        } else {
          if(a.time < b.time) {
            return -1;
          } else if(a.time > b.time) {
            return 1;
          } else {
            return 0;
          }
        }
      });


      for(let appointment of appointments) {
        const mongoDBDate = new Date(appointment.date);
        const yourStartingDate = new Date(this.selectedDate);

        if(this.flag) {
          
          const timeString = appointment.time.split(':');
          mongoDBDate.setHours(Number(timeString[0]));
          mongoDBDate.setMinutes(Number(timeString[1]));

          const endingMongoDBDate = new Date(mongoDBDate.getTime() + 60000 * appointment.examination.duration);

          console.log("Your date: " + this.potentialStartingTime);
          console.log("Your Ending date: " + this.potentialEndingTime);
          console.log("MongoDB date: " + mongoDBDate);
          console.log("Ending MongoDB date: "+ endingMongoDBDate);

          if(this.potentialStartingTime > endingMongoDBDate) {
            this.previousEndingTime = endingMongoDBDate;
            console.log("skipujemoga");
            continue;
          }
          else if(this.potentialStartingTime >= mongoDBDate && this.potentialStartingTime <= endingMongoDBDate) {
            this.message = "This doctor is not available at this time!";
            setTimeout(() => {
              this.message = "";
            },2000);
            return;
          }
          else if(this.potentialEndingTime >= mongoDBDate && this.potentialEndingTime <= endingMongoDBDate) {
            this.message = "This doctor is not available at this time!";
            setTimeout(() => {
              this.message = "";
            },2000);
            return;
          }
          else if(this.potentialEndingTime > mongoDBDate) {
            this.message = "This doctor is not available at this time!";
            setTimeout(() => {
              this.message = "";
            },2000);
            return;
          }
          else {
            break;
          }
        }

        //da li ovo mora ovako, molim?
        if (mongoDBDate < yourStartingDate) {
        } else if (mongoDBDate > yourStartingDate) {
        } else {
          //MongoDB Time
          const timeString = appointment.time.split(':');
          mongoDBDate.setHours(Number(timeString[0]));
          mongoDBDate.setMinutes(Number(timeString[1]));

          const endingMongoDBDate = new Date(mongoDBDate.getTime() + 60000 * appointment.examination.duration);

          //Your time
          const myTimeString = this.selectedTime.toString().split(':');

          yourStartingDate.setHours(Number(myTimeString[0]));
          yourStartingDate.setMinutes(Number(myTimeString[1]));

          const yourEndingDate = new Date(yourStartingDate.getTime() + 60000 * this.examination.duration);

          //print all three dates
          console.log("Your date: " + this.potentialStartingTime);
          console.log("Your Ending date: " + this.potentialEndingTime);
          console.log("MongoDB date: " + mongoDBDate);
          console.log("Ending MongoDB date: "+ endingMongoDBDate);
        

          if((yourStartingDate >= mongoDBDate && yourStartingDate <= endingMongoDBDate) || (yourEndingDate >= mongoDBDate && yourEndingDate <= endingMongoDBDate)) {
            this.message = "This doctor is not available at this time!";
            setTimeout(() => {
              this.message = "";
            },2000);
            return;
          }
          else {
            //check this date with the next!
            this.flag = true;
            console.log("OVO JE POTENCIJALNO VREME!");

            this.potentialStartingTime = yourStartingDate;
            this.potentialEndingTime = yourEndingDate;
            this.previousEndingTime = endingMongoDBDate;

            console.log("Your date: " + this.potentialStartingTime);
            console.log("Your Ending date: " + this.potentialEndingTime);
            console.log("MongoDB date: " + mongoDBDate);
            console.log("Ending MongoDB date: "+ endingMongoDBDate);
          }
        }
      }
      //end for:
      const myTimeString = this.selectedTime.toString().split(':');
      let appointment = {
        "examination": this.examination,
        "name": this.examination.name,
        "doctor": this.doctor,
        "date": this.selectedDate,
        "time": myTimeString[0] + ":" + myTimeString[1],
        "branch": this.doctor.branch,
        "status": "created",
        "patient": this.loggedInUser,
        "reason": ""
      };

      this.appointmentService.saveAppointment(appointment).subscribe((data: any) => {
        if(data['message']=='ok') {
          console.log("Appointment saved!");
          console.log(appointment);
          this.positiveMessage = "Appointment successfully scheduled!";
          setTimeout(() => {
            this.positiveMessage = "";
          },2000);
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.setItem('loggedInUserType', "none");

    //refresh page!
    this.router.navigateByUrl('/patient/makeAppointment', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
