import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContratBackComponent } from './update-contrat-back.component';

describe('UpdateContratBackComponent', () => {
  let component: UpdateContratBackComponent;
  let fixture: ComponentFixture<UpdateContratBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContratBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateContratBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
