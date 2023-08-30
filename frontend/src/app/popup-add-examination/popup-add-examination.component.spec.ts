import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddExaminationComponent } from './popup-add-examination.component';

describe('PopupAddExaminationComponent', () => {
  let component: PopupAddExaminationComponent;
  let fixture: ComponentFixture<PopupAddExaminationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupAddExaminationComponent]
    });
    fixture = TestBed.createComponent(PopupAddExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
