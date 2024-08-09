import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpcontupdateComponent } from './empcontupdate.component';

describe('EmpcontupdateComponent', () => {
  let component: EmpcontupdateComponent;
  let fixture: ComponentFixture<EmpcontupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpcontupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpcontupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
