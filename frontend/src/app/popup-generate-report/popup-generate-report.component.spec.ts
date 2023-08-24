import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGenerateReportComponent } from './popup-generate-report.component';

describe('PopupGenerateReportComponent', () => {
  let component: PopupGenerateReportComponent;
  let fixture: ComponentFixture<PopupGenerateReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupGenerateReportComponent]
    });
    fixture = TestBed.createComponent(PopupGenerateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
