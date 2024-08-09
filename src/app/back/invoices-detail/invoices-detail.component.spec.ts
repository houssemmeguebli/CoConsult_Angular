import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesDetailComponent } from './invoices-detail.component';

describe('InvoicesDetailComponent', () => {
  let component: InvoicesDetailComponent;
  let fixture: ComponentFixture<InvoicesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
