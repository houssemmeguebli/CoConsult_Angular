import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatProjectComponent } from './chat-project.component';

describe('ChatProjectComponent', () => {
  let component: ChatProjectComponent;
  let fixture: ComponentFixture<ChatProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
