import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartupdateComponent } from './departupdate.component';

describe('DepartupdateComponent', () => {
  let component: DepartupdateComponent;
  let fixture: ComponentFixture<DepartupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
