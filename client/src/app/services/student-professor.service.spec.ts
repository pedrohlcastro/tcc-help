import { TestBed, inject } from '@angular/core/testing';

import { StudentProfessorService } from './student-professor.service';

describe('StudentProfessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentProfessorService]
    });
  });

  it('should be created', inject([StudentProfessorService], (service: StudentProfessorService) => {
    expect(service).toBeTruthy();
  }));
});
