import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../../widget/cart-item/cart-item';
import { MaxStrLenPipe } from '../../../pipe/max-str-len-pipe';
import { CartService } from '../../../service/cart/cart';
import { FetchCart } from '../../../utils/types/cart.dto';

@Component({
  selector: 'app-cart-items',
  imports: [CartItem],
  templateUrl: './cart-items.html',
  styleUrl: './cart-items.css'
})
export class CartItemsPage implements OnInit {

  cartId!: string;
  cartItems!: FetchCart;

  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService) {
    this.cartId = this.activatedRoute.snapshot.paramMap.get('cartId')!
  }

  ngOnInit(): void {
    this.fetchCartItems()
  }

  fetchCartItems() {
    const fetchCartItemsSubscription = this.cartService.getCartById(this.cartId).subscribe({
      next: (v) => {
        if (!v.body) return;
        this.cartItems = v.body.cart
        console.log(this.cartItems)
      },
      complete: () => {
        fetchCartItemsSubscription.unsubscribe()
      }
    })
  }

  removeItem(cartItemId: string) {
    this.cartItems = this.cartItems.filter(cartItem => (cartItem.id !== cartItemId))
  }
}
