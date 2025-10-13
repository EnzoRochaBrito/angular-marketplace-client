import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../../widget/cart-item/cart-item';
import { MaxStrLenPipe } from '../../../pipe/max-str-len-pipe';

@Component({
  selector: 'app-cart-items',
  imports: [CartItem],
  templateUrl: './cart-items.html',
  styleUrl: './cart-items.css'
})
export class CartItemsPage implements OnInit {

  cartId!: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cartId = this.activatedRoute.snapshot.paramMap.get('cartId')!
    console.log(this.cartId)
  }
}
