import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedPackStatisticsComponent } from './red-pack-statistics.component';

describe('RedPackStatisticsComponent', () => {
  let component: RedPackStatisticsComponent;
  let fixture: ComponentFixture<RedPackStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedPackStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedPackStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
