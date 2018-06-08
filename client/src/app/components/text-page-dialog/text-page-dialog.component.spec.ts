import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPageDialogComponent } from './text-page-dialog.component';

describe('TextPageDialogComponent', () => {
  let component: TextPageDialogComponent;
  let fixture: ComponentFixture<TextPageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
