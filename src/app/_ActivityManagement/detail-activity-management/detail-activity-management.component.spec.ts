import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailActivityManagementComponent } from './detail-activity-management.component';

describe('DetailActivityManagementComponent', () => {
  let component: DetailActivityManagementComponent;
  let fixture: ComponentFixture<DetailActivityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailActivityManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailActivityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
