import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMiscellaneousComponent } from './doctor-miscellaneous.component';

describe('DoctorMiscellaneousComponent', () => {
  let component: DoctorMiscellaneousComponent;
  let fixture: ComponentFixture<DoctorMiscellaneousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorMiscellaneousComponent]
    });
    fixture = TestBed.createComponent(DoctorMiscellaneousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
