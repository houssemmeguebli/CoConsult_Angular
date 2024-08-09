import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackaddComponent } from './feedbackadd.component';

describe('FeedbackaddComponent', () => {
  let component: FeedbackaddComponent;
  let fixture: ComponentFixture<FeedbackaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
