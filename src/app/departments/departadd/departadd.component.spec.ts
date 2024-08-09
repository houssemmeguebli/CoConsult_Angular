import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartaddComponent } from './departadd.component';

describe('DepartaddComponent', () => {
  let component: DepartaddComponent;
  let fixture: ComponentFixture<DepartaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
