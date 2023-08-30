import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteExaminationComponent } from './popup-delete-examination.component';

describe('PopupDeleteExaminationComponent', () => {
  let component: PopupDeleteExaminationComponent;
  let fixture: ComponentFixture<PopupDeleteExaminationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupDeleteExaminationComponent]
    });
    fixture = TestBed.createComponent(PopupDeleteExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
