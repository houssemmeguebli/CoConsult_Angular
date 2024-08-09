import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveupdateComponent } from './leaveupdate.component';

describe('LeaveupdateComponent', () => {
  let component: LeaveupdateComponent;
  let fixture: ComponentFixture<LeaveupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
