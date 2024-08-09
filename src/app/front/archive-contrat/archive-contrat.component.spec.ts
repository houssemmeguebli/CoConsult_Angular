import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveContratComponent } from './archive-contrat.component';

describe('ArchiveContratComponent', () => {
  let component: ArchiveContratComponent;
  let fixture: ComponentFixture<ArchiveContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveContratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
