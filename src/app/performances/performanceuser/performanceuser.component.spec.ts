import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceuserComponent } from './performanceuser.component';

describe('PerformanceuserComponent', () => {
  let component: PerformanceuserComponent;
  let fixture: ComponentFixture<PerformanceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
