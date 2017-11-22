import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBeenShippedComponent } from './order-been-shipped.component';

describe('OrderBeenShippedComponent', () => {
  let component: OrderBeenShippedComponent;
  let fixture: ComponentFixture<OrderBeenShippedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBeenShippedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBeenShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
