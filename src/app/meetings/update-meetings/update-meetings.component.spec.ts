import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMeetingsComponent } from './update-meetings.component';

describe('UpdateMeetingsComponent', () => {
  let component: UpdateMeetingsComponent;
  let fixture: ComponentFixture<UpdateMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMeetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
