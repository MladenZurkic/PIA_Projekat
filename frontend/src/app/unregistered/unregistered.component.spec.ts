import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredComponent } from './unregistered.component';

describe('UnregisteredComponent', () => {
  let component: UnregisteredComponent;
  let fixture: ComponentFixture<UnregisteredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnregisteredComponent]
    });
    fixture = TestBed.createComponent(UnregisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
