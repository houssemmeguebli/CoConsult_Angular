import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UComponent } from './u.component';

describe('UComponent', () => {
  let component: UComponent;
  let fixture: ComponentFixture<UComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
