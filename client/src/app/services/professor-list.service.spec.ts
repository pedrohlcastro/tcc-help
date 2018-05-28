import { TestBed, inject } from '@angular/core/testing';

import { ProfessorListService } from './professor-list.service';

describe('ProfessorListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessorListService]
    });
  });

  it('should be created', inject([ProfessorListService], (service: ProfessorListService) => {
    expect(service).toBeTruthy();
  }));
});
