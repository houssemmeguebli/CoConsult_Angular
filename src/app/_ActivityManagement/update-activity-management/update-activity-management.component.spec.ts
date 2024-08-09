import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActivityManagementComponent } from './update-activity-management.component';

describe('UpdateActivityManagementComponent', () => {
  let component: UpdateActivityManagementComponent;
  let fixture: ComponentFixture<UpdateActivityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateActivityManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateActivityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
