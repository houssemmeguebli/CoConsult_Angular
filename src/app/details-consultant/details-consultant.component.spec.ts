import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsConsultantComponent } from './details-consultant.component';

describe('DetailsConsultantComponent', () => {
  let component: DetailsConsultantComponent;
  let fixture: ComponentFixture<DetailsConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsConsultantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
