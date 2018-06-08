import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumAnswerDialogComponent } from './forum-answer-dialog.component';

describe('ForumAnswerDialogComponent', () => {
  let component: ForumAnswerDialogComponent;
  let fixture: ComponentFixture<ForumAnswerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumAnswerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
