import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavedetailComponent } from './leavedetail.component';

describe('LeavedetailComponent', () => {
  let component: LeavedetailComponent;
  let fixture: ComponentFixture<LeavedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
