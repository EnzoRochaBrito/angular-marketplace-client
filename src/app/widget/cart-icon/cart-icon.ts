import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cart-icon',
  imports: [RouterLink],
  templateUrl: './cart-icon.html',
  styleUrl: './cart-icon.css'
})
export class CartIcon {
@Input() cartId!: string
@Input() name!: string
}
