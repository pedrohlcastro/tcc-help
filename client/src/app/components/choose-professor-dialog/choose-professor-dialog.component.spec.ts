import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseProfessorDialogComponent } from './choose-professor-dialog.component';

describe('ChooseProfessorDialogComponent', () => {
  let component: ChooseProfessorDialogComponent;
  let fixture: ComponentFixture<ChooseProfessorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseProfessorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseProfessorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
