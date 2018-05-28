import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTccPageComponent } from './check-tcc-page.component';

describe('CheckTccPageComponent', () => {
  let component: CheckTccPageComponent;
  let fixture: ComponentFixture<CheckTccPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTccPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTccPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
