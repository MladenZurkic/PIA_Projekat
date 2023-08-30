import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSpecsAndAppointmentsComponent } from './manager-specs-and-appointments.component';

describe('ManagerSpecsAndAppointmentsComponent', () => {
  let component: ManagerSpecsAndAppointmentsComponent;
  let fixture: ComponentFixture<ManagerSpecsAndAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerSpecsAndAppointmentsComponent]
    });
    fixture = TestBed.createComponent(ManagerSpecsAndAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
