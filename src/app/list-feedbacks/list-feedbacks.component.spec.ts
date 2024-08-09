import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedbacksComponent } from './list-feedbacks.component';

describe('ListFeedbacksComponent', () => {
  let component: ListFeedbacksComponent;
  let fixture: ComponentFixture<ListFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFeedbacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
