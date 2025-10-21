import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { server } from '../../utils/backend-routes/backend.routes';
import { FetchCart, FetchUserCarts } from '../../utils/types/cart.dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /**
   * Store user carts locally to prevent multiple fetchs
   */

  userCarts = signal<FetchUserCarts>([])
  /**
   * Checks if the service already requisited the server for the carts
   */
  private userCartsFetched = signal<boolean>(false)

  constructor(private http: HttpClient) { }

  /**
   * Fetch user carts
   * @returns @type FetchUserCarts
   */
  getUserCarts() {
    if (this.alreadyFetchedUserCarts()) return this.userCarts();

    const getUserCartsSubscription = this.http.get<{carts: FetchUserCarts}>(server.api.cart.base, { observe: 'response', withCredentials: true }).subscribe({
      next: (v) => {
        if (!v.body) return;
        const carts = v.body.carts
        this.userCarts.set(carts)
        this.userCartsFetched.set(true)
      },
      complete: () => {
        getUserCartsSubscription.unsubscribe()
      }
    })

    return this.userCarts()
  }
  
  getCartById(id: string) {
    return this.http.get<{cart: FetchCart}>(server.api.cart.cartId(id).id, { observe: 'response', withCredentials: true })
  }

  updateCartItemAmount(cartItemId: string, amount: number) {
    const subscription = this.http.patch(server.api.cart.cartProduct(cartItemId), { amount }, { observe: 'response' }).subscribe({
      complete: () => {
        subscription.unsubscribe()
      }
    })
  }

  // need to be implemented on the CartItem widget, to emit the delete event correctly
  /**
   * ### Delete cart item
   * Need implementation locally
   * @param cartItemId 
   * @returns 
   */
  deleteCartItem(cartItemId: string) {
    return this.http.delete(server.api.cart.cartProduct(cartItemId), { observe: 'response' })
  }

  insertProductToCart(cartId: string, productId: string, amount: number) {
    const subscription = this.http.post(server.api.cart.cartId(cartId).product, {
      productId: productId,
      amount: amount
    }, { observe: 'response' }).subscribe({
      next: (v) => {
        if (!v.body) return;
        console.log(v)
      },
      complete: () => {
        subscription.unsubscribe()
      }
    })
  }

  private alreadyFetchedUserCarts() {
    return this.userCartsFetched()
  }
}
