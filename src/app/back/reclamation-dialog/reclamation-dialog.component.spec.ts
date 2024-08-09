import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationDialogComponent } from './reclamation-dialog.component';

describe('ReclamationDialogComponent', () => {
  let component: ReclamationDialogComponent;
  let fixture: ComponentFixture<ReclamationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
