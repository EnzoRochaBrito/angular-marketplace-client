import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsPage } from './cart-items';

describe('CartItemsPage', () => {
  let component: CartItemsPage;
  let fixture: ComponentFixture<CartItemsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
