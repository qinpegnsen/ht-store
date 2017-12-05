import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShopInfoComponent } from './edit-shop-info.component';

describe('EditShopInfoComponent', () => {
  let component: EditShopInfoComponent;
  let fixture: ComponentFixture<EditShopInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShopInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
