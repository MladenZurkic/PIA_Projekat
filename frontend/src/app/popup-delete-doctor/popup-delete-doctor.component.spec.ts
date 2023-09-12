import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteDoctorComponent } from './popup-delete-doctor.component';

describe('PopupDeleteDoctorComponent', () => {
  let component: PopupDeleteDoctorComponent;
  let fixture: ComponentFixture<PopupDeleteDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupDeleteDoctorComponent]
    });
    fixture = TestBed.createComponent(PopupDeleteDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
