import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTccComponent } from './student-tcc.component';

describe('StudentTccComponent', () => {
  let component: StudentTccComponent;
  let fixture: ComponentFixture<StudentTccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
