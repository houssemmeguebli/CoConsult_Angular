import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpcontdetailComponent } from './empcontdetail.component';

describe('EmpcontdetailComponent', () => {
  let component: EmpcontdetailComponent;
  let fixture: ComponentFixture<EmpcontdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpcontdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpcontdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
