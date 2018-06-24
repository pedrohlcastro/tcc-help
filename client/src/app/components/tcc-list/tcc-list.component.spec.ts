import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccListComponent } from './tcc-list.component';

describe('TccListComponent', () => {
  let component: TccListComponent;
  let fixture: ComponentFixture<TccListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
