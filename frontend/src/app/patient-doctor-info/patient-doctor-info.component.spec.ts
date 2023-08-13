import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDoctorInfoComponent } from './patient-doctor-info.component';

describe('PatientDoctorInfoComponent', () => {
  let component: PatientDoctorInfoComponent;
  let fixture: ComponentFixture<PatientDoctorInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDoctorInfoComponent]
    });
    fixture = TestBed.createComponent(PatientDoctorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
