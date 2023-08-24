import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAddDoctorComponent } from './manager-add-doctor.component';

describe('ManagerAddDoctorComponent', () => {
  let component: ManagerAddDoctorComponent;
  let fixture: ComponentFixture<ManagerAddDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerAddDoctorComponent]
    });
    fixture = TestBed.createComponent(ManagerAddDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
