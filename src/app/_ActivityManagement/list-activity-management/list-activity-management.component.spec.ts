import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActivityManagementComponent } from './list-activity-management.component';

describe('ListActivityManagementComponent', () => {
  let component: ListActivityManagementComponent;
  let fixture: ComponentFixture<ListActivityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActivityManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActivityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
