import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesnoDialogComponent } from './yesno-dialog.component';

describe('YesnoDialogComponent', () => {
  let component: YesnoDialogComponent;
  let fixture: ComponentFixture<YesnoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesnoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
