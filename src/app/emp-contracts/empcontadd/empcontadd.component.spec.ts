import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpcontaddComponent } from './empcontadd.component';

describe('EmpcontaddComponent', () => {
  let component: EmpcontaddComponent;
  let fixture: ComponentFixture<EmpcontaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpcontaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpcontaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
