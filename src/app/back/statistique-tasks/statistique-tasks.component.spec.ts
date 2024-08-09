import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueTasksComponent } from './statistique-tasks.component';

describe('StatistiqueTasksComponent', () => {
  let component: StatistiqueTasksComponent;
  let fixture: ComponentFixture<StatistiqueTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiqueTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
