import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccStatsCardComponent } from './tcc-stats-card.component';

describe('TccStatsCardComponent', () => {
  let component: TccStatsCardComponent;
  let fixture: ComponentFixture<TccStatsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccStatsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccStatsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
