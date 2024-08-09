import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityManagementComponent } from './add-activity-management.component';

describe('AddActivityManagementComponent', () => {
  let component: AddActivityManagementComponent;
  let fixture: ComponentFixture<AddActivityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActivityManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActivityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
