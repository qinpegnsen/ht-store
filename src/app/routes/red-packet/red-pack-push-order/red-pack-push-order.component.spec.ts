import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedPackPushOrderComponent } from './red-pack-push-order.component';

describe('RedPackPushOrderComponent', () => {
  let component: RedPackPushOrderComponent;
  let fixture: ComponentFixture<RedPackPushOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedPackPushOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedPackPushOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
