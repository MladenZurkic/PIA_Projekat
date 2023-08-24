import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditDoctorComponent } from './popup-edit-doctor.component';

describe('PopupEditDoctorComponent', () => {
  let component: PopupEditDoctorComponent;
  let fixture: ComponentFixture<PopupEditDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupEditDoctorComponent]
    });
    fixture = TestBed.createComponent(PopupEditDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
