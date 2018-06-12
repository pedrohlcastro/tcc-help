import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTccsComponent } from './view-tccs.component';

describe('ViewTccsComponent', () => {
  let component: ViewTccsComponent;
  let fixture: ComponentFixture<ViewTccsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTccsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTccsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
