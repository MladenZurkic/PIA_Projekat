import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientInfoComponent } from './doctor-patient-info.component';

describe('DoctorPatientInfoComponent', () => {
  let component: DoctorPatientInfoComponent;
  let fixture: ComponentFixture<DoctorPatientInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPatientInfoComponent]
    });
    fixture = TestBed.createComponent(DoctorPatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
