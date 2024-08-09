import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavebyuserComponent } from './leavebyuser.component';

describe('LeavebyuserComponent', () => {
  let component: LeavebyuserComponent;
  let fixture: ComponentFixture<LeavebyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavebyuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavebyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
