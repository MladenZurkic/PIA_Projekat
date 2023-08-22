import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-popup-generate-report',
  templateUrl: './popup-generate-report.component.html',
  styleUrls: ['./popup-generate-report.component.css']
})
export class PopupGenerateReportComponent implements OnInit{

  inputValue: string = '';
  appointment: Appointment;

  constructor(
    public dialogRef: MatDialogRef<PopupGenerateReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.appointment = this.data.appointment;
  }


  onSubmit() {
    this.dialogRef.close(this.inputValue);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
