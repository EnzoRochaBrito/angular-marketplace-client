import { Component } from '@angular/core';
import { CartIcon } from '../../../widget/cart-icon/cart-icon';
import { CartService } from '../../../service/cart/cart';

@Component({
  selector: 'app-cart',
  imports: [CartIcon],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartPage {

  constructor(readonly cartService: CartService) { }
  
}
