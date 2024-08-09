import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferUpdateComponent } from './job-offer-update.component';

describe('JobOfferUpdateComponent', () => {
  let component: JobOfferUpdateComponent;
  let fixture: ComponentFixture<JobOfferUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOfferUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
