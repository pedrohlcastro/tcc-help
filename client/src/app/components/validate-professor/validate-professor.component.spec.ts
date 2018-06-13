import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateProfessorComponent } from './validate-professor.component';

describe('ValidateProfessorComponent', () => {
  let component: ValidateProfessorComponent;
  let fixture: ComponentFixture<ValidateProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
