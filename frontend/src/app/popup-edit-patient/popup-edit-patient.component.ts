import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';
import { AppointmentService } from '../services/appointment.service';
import { Patient } from '../models/patient';
import { ManagerService } from '../services/manager.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-popup-edit-patient',
  templateUrl: './popup-edit-patient.component.html',
  styleUrls: ['./popup-edit-patient.component.css']
})
export class PopupEditPatientComponent {

  constructor(private cdRef: ChangeDetectorRef, private appointmentService: AppointmentService, private reportService: ReportService, public dialogRef: MatDialogRef<PopupEditPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient, private managerService: ManagerService, private patientService: PatientService) { }
  
  
    patient: Patient;
  
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    address: string;


    initialPassword: string;
    textColorPassword: string = "gray";

    initialFirstname: string;
    textColorFirstname: string = "gray";

    initialLastname: string;
    textColorLastname: string = "gray";

    initialEmail: string;
    textColorEmail: string = "gray";

    initialPhoneNumber: string;
    textColorPhoneNumber: string = "gray";

    initialAddress: string;
    textColorAddress: string = "gray";
    
    selectedFile: File = null;
    imagePath: string = "";

    ngOnInit(): void {
      this.patient = this.data;
      this.username = this.patient.username;

      this.initialPassword = this.patient.password;
      this.password = this.patient.password;

      this.initialFirstname = this.patient.firstname;
      this.firstname = this.patient.firstname;

      this.initialLastname = this.patient.lastname;
      this.lastname = this.patient.lastname;

      this.initialEmail = this.patient.email;
      this.email = this.patient.email;

      this.initialPhoneNumber = this.patient.phoneNumber;
      this.phoneNumber = this.patient.phoneNumber;

      this.initialAddress = this.patient.address;
      this.address = this.patient.address;

      this.initialEmail = this.patient.email;
      this.email = this.patient.email;
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    save() {
      if(this.textColorAddress == "gray" && this.textColorEmail == "gray" && this.textColorFirstname == "gray" && this.textColorLastname == "gray" && this.textColorPassword == "gray" && this.textColorPhoneNumber == "gray" && this.selectedFile == null) {
        //no changes detected
        this.dialogRef.close(true);
      }
      else {
        //changes detected

        if(this.selectedFile) {
          if (!this.selectedFile.type.startsWith('image/') || !this.selectedFile.type.includes('jpeg') && !this.selectedFile.type.includes('png')) {
            this.dialogRef.close();
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

                  this.patient.password = this.password;
                  this.patient.firstname = this.firstname;
                  this.patient.lastname = this.lastname;
                  this.patient.email = this.email;
                  this.patient.phoneNumber = this.phoneNumber;
                  this.patient.address = this.address;
                  this.patient.imagePath = this.imagePath;

                  this.managerService.editPatient(this.patient).subscribe((response: any) => {
                    if (response['message'] == "ok") {
                      this.dialogRef.close(true);
                    }
                    else {
                      this.dialogRef.close();
                      return;
                    }
                  });
                }
              });
            } else {
              this.dialogRef.close();
              return;
            }
          };
        } else {
          //Nema promene slike
          this.patient.password = this.password;
          this.patient.firstname = this.firstname;
          this.patient.lastname = this.lastname;
          this.patient.email = this.email;
          this.patient.phoneNumber = this.phoneNumber;
          this.patient.address = this.address;

          this.managerService.editPatient(this.patient).subscribe((response: any) => {
            if (response['message'] == "ok") {
              this.dialogRef.close(true);
            }
            else {
              this.dialogRef.close();
              return;
            }
          });
        }

      }
    }
  
    cancel() {
      this.dialogRef.close();
    }

    onInputChangePassword(event: any) {
      const newValue = event.target.value;
      this.textColorPassword = newValue === this.initialPassword ? "gray" : "black";
    }

    onInputChangeFirstname(event: any) {
      const newValue = event.target.value;
      this.textColorFirstname = newValue === this.initialFirstname ? "gray" : "black";
    }

    onInputChangeLastname(event: any) {
      const newValue = event.target.value;
      this.textColorLastname = newValue === this.initialLastname ? "gray" : "black";
    }

    onInputChangeAddress(event: any) {
      const newValue = event.target.value;
      this.textColorAddress = newValue === this.initialAddress ? "gray" : "black";
    }

    onInputChangePhoneNumber(event: any) {
      const newValue = event.target.value;
      this.textColorPhoneNumber = newValue === this.initialPhoneNumber ? "gray" : "black";
    }

    onInputChangeEmail(event: any) {
      const newValue = event.target.value;
      this.textColorEmail = newValue === this.initialEmail ? "gray" : "black";
    }
}
