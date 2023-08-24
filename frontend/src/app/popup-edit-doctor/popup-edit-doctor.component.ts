import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';
import { AppointmentService } from '../services/appointment.service';
import { Patient } from '../models/patient';
import { ManagerService } from '../services/manager.service';
import { PatientService } from '../services/patient.service';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';


@Component({
  selector: 'app-popup-edit-doctor',
  templateUrl: './popup-edit-doctor.component.html',
  styleUrls: ['./popup-edit-doctor.component.css']
})
export class PopupEditDoctorComponent {

  constructor(private cdRef: ChangeDetectorRef, private appointmentService: AppointmentService, private reportService: ReportService, public dialogRef: MatDialogRef<PopupEditDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Doctor, private managerService: ManagerService, private patientService: PatientService, private doctorService: DoctorService) { }


    doctor: Doctor;

    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    address: string;
    licenceNumber: number;
    branch: string;
    specialization: string;

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

    initialLicenceNumber: number;
    textColorLicenceNumber: string = "gray";

    initialBranch: string;
    textColorBranch: string = "gray";

    initialSpecialization: string;
    textColorSpecialization: string = "gray";
    
    selectedFile: File = null;
    imagePath: string = "";

    ngOnInit(): void {
      this.doctor = this.data;
      this.username = this.doctor.username;

      this.initialPassword = this.doctor.password;
      this.password = this.doctor.password;

      this.initialFirstname = this.doctor.firstname;
      this.firstname = this.doctor.firstname;

      this.initialLastname = this.doctor.lastname;
      this.lastname = this.doctor.lastname;

      this.initialEmail = this.doctor.email;
      this.email = this.doctor.email;

      this.initialPhoneNumber = this.doctor.phoneNumber;
      this.phoneNumber = this.doctor.phoneNumber;

      this.initialAddress = this.doctor.address;
      this.address = this.doctor.address;

      this.initialEmail = this.doctor.email;
      this.email = this.doctor.email;

      this.initialLicenceNumber = this.doctor.licenceNumber;
      this.licenceNumber = this.doctor.licenceNumber;

      this.initialBranch = this.doctor.branch;
      this.branch = this.doctor.branch;

      this.initialSpecialization = this.doctor.specialization.name;
      this.specialization = this.doctor.specialization.name;
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }


    save() {
      if(this.textColorAddress == "gray" && this.textColorEmail == "gray" && this.textColorFirstname == "gray" && this.textColorLastname == "gray" && this.textColorPassword == "gray" && this.textColorPhoneNumber == "gray" && this.textColorLicenceNumber == "gray" && this.textColorBranch == "gray" && this.textColorSpecialization == "gray" && this.selectedFile == null) {
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
  
              this.doctorService.uploadImage(formData).subscribe((res: any) => {
                if(res['message'] == "Image uploaded successfully.") {
                  this.imagePath = res['imagePath'];

                  this.doctor.password = this.password;
                  this.doctor.firstname = this.firstname;
                  this.doctor.lastname = this.lastname;
                  this.doctor.email = this.email;
                  this.doctor.phoneNumber = this.phoneNumber;
                  this.doctor.address = this.address;
                  this.doctor.imagePath = this.imagePath;
                  this.doctor.licenceNumber = this.licenceNumber;
                  this.doctor.branch = this.branch;
                  this.doctor.specialization.name = this.specialization;

                  this.managerService.editDoctor(this.doctor).subscribe((response: any) => {
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
          this.doctor.password = this.password;
          this.doctor.firstname = this.firstname;
          this.doctor.lastname = this.lastname;
          this.doctor.email = this.email;
          this.doctor.phoneNumber = this.phoneNumber;
          this.doctor.address = this.address;
          this.doctor.licenceNumber = this.licenceNumber;
          this.doctor.branch = this.branch;
          this.doctor.specialization.name = this.specialization;

          this.managerService.editDoctor(this.doctor).subscribe((response: any) => {
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

    onInputChangeLicenceNumber(event: any) {
      const newValue = event.target.value;
      this.textColorLicenceNumber = newValue === this.initialLicenceNumber ? "gray" : "black";
    }

    onInputChangeBranch(event: any) {
      const newValue = event.target.value;
      this.textColorBranch = newValue === this.initialBranch ? "gray" : "black";
    }

    onInputChangeSpecialization(event: any) {
      const newValue = event.target.value;
      this.textColorSpecialization = newValue === this.initialSpecialization ? "gray" : "black";
    }

}
