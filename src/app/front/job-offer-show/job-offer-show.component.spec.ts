import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferShowComponent } from './job-offer-show.component';

describe('JobOfferShowComponent', () => {
  let component: JobOfferShowComponent;
  let fixture: ComponentFixture<JobOfferShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOfferShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
