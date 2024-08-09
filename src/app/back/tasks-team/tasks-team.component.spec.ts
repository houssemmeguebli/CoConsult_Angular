import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksTeamComponent } from './tasks-team.component';

describe('TasksTeamComponent', () => {
  let component: TasksTeamComponent;
  let fixture: ComponentFixture<TasksTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
