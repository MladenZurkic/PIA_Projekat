import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditExaminationComponent } from './popup-edit-examination.component';

describe('PopupEditExaminationComponent', () => {
  let component: PopupEditExaminationComponent;
  let fixture: ComponentFixture<PopupEditExaminationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupEditExaminationComponent]
    });
    fixture = TestBed.createComponent(PopupEditExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
