import { TestBed } from '@angular/core/testing';

import { Project_2Service } from './project_2.service';

describe('ProjectService', () => {
  let service: Project_2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Project_2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
