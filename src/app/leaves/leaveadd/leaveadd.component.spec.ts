import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveaddComponent } from './leaveadd.component';

describe('LeaveaddComponent', () => {
  let component: LeaveaddComponent;
  let fixture: ComponentFixture<LeaveaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
