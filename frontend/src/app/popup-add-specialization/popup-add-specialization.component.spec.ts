import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddSpecializationComponent } from './popup-add-specialization.component';

describe('PopupAddSpecializationComponent', () => {
  let component: PopupAddSpecializationComponent;
  let fixture: ComponentFixture<PopupAddSpecializationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupAddSpecializationComponent]
    });
    fixture = TestBed.createComponent(PopupAddSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
