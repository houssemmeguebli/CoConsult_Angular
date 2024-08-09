import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTasksBackComponent } from './update-tasks-back.component';

describe('UpdateTasksBackComponent', () => {
  let component: UpdateTasksBackComponent;
  let fixture: ComponentFixture<UpdateTasksBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTasksBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTasksBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
