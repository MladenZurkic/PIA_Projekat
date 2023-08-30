import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMakeAppointmentComponent } from './patient-make-appointment.component';

describe('PatientMakeAppointmentComponent', () => {
  let component: PatientMakeAppointmentComponent;
  let fixture: ComponentFixture<PatientMakeAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientMakeAppointmentComponent]
    });
    fixture = TestBed.createComponent(PatientMakeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
