import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SelectAmount } from '../select-amount/select-amount';
import { MaxStrLenPipe } from '../../pipe/max-str-len-pipe';
import { CartService } from '../../service/cart/cart';

@Component({
  selector: 'cart-item',
  imports: [RouterLink, SelectAmount, MaxStrLenPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css'
})
export class CartItem implements OnInit {
@Input() itemId!: string;
@Input() cartItemId!: string;
@Input() itemImage!: string;
@Input() itemName!: string;
@Input() itemAmount!: number;
@Input() itemPrice!: number;
/**
 * ### Emits the cart item id
 */
@Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>()

constructor(private cartService: CartService) { }

totalPrice!: number;

ngOnInit(): void {
  this.totalPrice = this.itemAmount * this.itemPrice
}

updateAmount(amount: number) {
  this.itemAmount = amount
  this.totalPrice = this.itemAmount * this.itemPrice
  this.cartService.updateCartItemAmount(this.cartItemId!, amount)
}

delete() {
  const subscription = this.cartService.deleteCartItem(this.cartItemId).subscribe({
    next: (v) => {
      if (!v.body) return;
      console.log(v.body)
      this.deleteEvent.emit(this.cartItemId) // emits event to CartItemsPage
    },
    complete: () => {
      subscription.unsubscribe()
    }
  })
}
}
