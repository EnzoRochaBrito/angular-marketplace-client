import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalHolder } from '../../../../widget/modal-holder/modal-holder';
import { CartService } from '../../../../service/cart/cart';
import { ModalService } from '../../../../service/modal/modal';
import { UserService } from '../../../../service/user/user';

@Component({
  selector: 'select-cart-modal',
  imports: [ModalHolder],
  templateUrl: './select-cart-modal.html',
  styleUrl: './select-cart-modal.css'
})
export class SelectCartModal implements OnInit {

  @Output() selectedCart: EventEmitter<string> = new EventEmitter<string>(false)

  constructor(readonly cartService: CartService, readonly modalService: ModalService, readonly userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.isLogged() && !this.cartService.userCartsFetched()) {
      this.cartService.getUserCarts()
    }
  }

  emitSelectedCart(id: string) {
    this.selectedCart.emit(id)
    this.modalService.close()
  }
}
