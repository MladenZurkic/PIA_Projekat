import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRequestsComponent } from './manager-requests.component';

describe('ManagerRequestsComponent', () => {
  let component: ManagerRequestsComponent;
  let fixture: ComponentFixture<ManagerRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerRequestsComponent]
    });
    fixture = TestBed.createComponent(ManagerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
