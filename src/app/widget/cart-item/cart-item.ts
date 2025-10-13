import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SelectAmount } from '../select-amount/select-amount';
import { MaxStrLenPipe } from '../../pipe/max-str-len-pipe';

@Component({
  selector: 'cart-item',
  imports: [RouterLink, SelectAmount, MaxStrLenPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css'
})
export class CartItem implements OnInit {
@Input() itemId!: string;
@Input() itemImage!: string;
@Input() itemName!: string;
@Input() itemAmount!: number;
@Input() itemPrice!: number;
@Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>()

totalPrice!: number;

ngOnInit(): void {
  this.totalPrice = this.itemAmount * this.itemPrice
}

amount(n: number) {
  this.itemAmount = n
  this.totalPrice = this.itemAmount * this.itemPrice
}

delete() {
  this.deleteEvent.emit(this.itemId)
}
}
