import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';
import { AppointmentService } from '../services/appointment.service';
import { Patient } from '../models/patient';
import { ManagerService } from '../services/manager.service';
import { PatientService } from '../services/patient.service';
import { Specialization } from '../models/specialization';
import { Examination } from '../models/examination';

@Component({
  selector: 'app-popup-edit-examination',
  templateUrl: './popup-edit-examination.component.html',
  styleUrls: ['./popup-edit-examination.component.css']
})
export class PopupEditExaminationComponent {

  constructor(private cdRef: ChangeDetectorRef, private appointmentService: AppointmentService, private reportService: ReportService, public dialogRef: MatDialogRef<PopupEditExaminationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Examination, private managerService: ManagerService, private patientService: PatientService) { }



    examination: Examination;
    name: string;
    duration: number;
    price: number;
    allSpecializations: Specialization[];

    selectedSpecialization: string = "";

    initialName: string;
    textColorName: string = "gray";

    initialDuration: number;
    textColorDuration: string = "gray";

    initialPrice: number;
    textColorPrice: string = "gray";

    ngOnInit(): void {
      this.examination = this.data;

      this.initialName = this.examination.name;
      this.name = this.examination.name;

      this.initialDuration = this.examination.duration;
      this.duration = this.examination.duration;

      this.initialPrice = this.examination.price;
      this.price = this.examination.price;

      this.managerService.getAllSpecializations().subscribe((specializations: Specialization[]) => {
        this.allSpecializations = specializations;
      });
    }

    cancel() {
      this.dialogRef.close();
    }

    save() {
      if(this.textColorName == "gray" && this.textColorDuration == "gray" && this.textColorPrice == "gray" && 
      (this.selectedSpecialization == "" || this.selectedSpecialization == this.examination.specialization.name)) {
        //no changes detected
        this.dialogRef.close(true);
      }
      else {
        //changes detected
        this.examination.name = this.name;
        this.examination.duration = this.duration;
        this.examination.price = this.price;

        this.allSpecializations.forEach(specialization => {
          if(specialization.name == this.selectedSpecialization) {
            this.examination.specialization = specialization;
          }
        });

        this.managerService.editExamination(this.examination).subscribe((data: any) => {
          if(data['message']=='ok') {
            this.dialogRef.close(true);
          }
          else {
            this.dialogRef.close();
          }
        });

      }
    }

    onDropdownChange(event: any) {
      this.selectedSpecialization = event.target.value;
    }

    onInputChangeName(event: any) {
      const newValue = event.target.value;
      this.textColorName = newValue === this.initialName ? "gray" : "black";
    }

    onInputChangeDuration(event: any) {
      const newValue = event.target.value;
      this.textColorDuration = newValue === this.initialDuration ? "gray" : "black";
    }

    onInputChangePrice(event: any) {
      const newValue = event.target.value;
      this.textColorPrice = newValue === this.initialPrice ? "gray" : "black";
    }



}
