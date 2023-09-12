import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from '../services/report.service';
import { AppointmentService } from '../services/appointment.service';
import { ManagerService } from '../services/manager.service';
import { Examination } from '../models/examination';


@Component({
  selector: 'app-popup-delete-examination',
  templateUrl: './popup-delete-examination.component.html',
  styleUrls: ['./popup-delete-examination.component.css']
})
export class PopupDeleteExaminationComponent {
  
  
  constructor(private cdRef: ChangeDetectorRef, private managerService: ManagerService, private reportService: ReportService, public dialogRef: MatDialogRef<PopupDeleteExaminationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Examination) { }
  
    examination: Examination;
  
    ngOnInit(): void {
      this.examination = this.data;
    }
  
    cancel() {
      this.dialogRef.close();
    }
  
    delete() {
      this.managerService.deleteExamination(this.examination).subscribe((data: any) => {
        if(data['message']=='ok') {
          this.dialogRef.close("success");
        }
        else {
          this.dialogRef.close();
        }
      });

      this.dialogRef.close(true);
    }
}
