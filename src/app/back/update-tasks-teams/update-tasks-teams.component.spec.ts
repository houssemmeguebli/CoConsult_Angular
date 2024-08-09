import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTasksTeamsComponent } from './update-tasks-teams.component';

describe('UpdateTasksTeamsComponent', () => {
  let component: UpdateTasksTeamsComponent;
  let fixture: ComponentFixture<UpdateTasksTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTasksTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTasksTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
