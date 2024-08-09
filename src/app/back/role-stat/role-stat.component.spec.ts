import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleStatComponent } from './role-stat.component';

describe('RoleStatComponent', () => {
  let component: RoleStatComponent;
  let fixture: ComponentFixture<RoleStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
