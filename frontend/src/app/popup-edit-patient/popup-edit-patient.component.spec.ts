import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditPatientComponent } from './popup-edit-patient.component';

describe('PopupEditPatientComponent', () => {
  let component: PopupEditPatientComponent;
  let fixture: ComponentFixture<PopupEditPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupEditPatientComponent]
    });
    fixture = TestBed.createComponent(PopupEditPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
