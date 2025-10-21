import { Component, OnInit } from '@angular/core';
import { StandartPage } from '../../../template/standart-page/standart-page';
import { ProductImageCarousel } from '../../../widget/product-image-carousel/product-image-carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectAmount } from '../../../widget/select-amount/select-amount';
import { Dropdown } from '../../../widget/dropdown/dropdown';
import { ProductCard } from '../../../widget/product-card/product-card';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../service/product/product';
import { emptyFetchProductById, FetchProductById, ManyProducts } from '../../../utils/types/product.dto';
import { ModalService } from '../../../service/modal/modal';
import { SelectCartModal } from './select-cart-modal/select-cart-modal';
import { CartService } from '../../../service/cart/cart';

type ProductBuffer = {
  productId: string,
  amount: number
}

@Component({
  selector: 'app-product',
  imports: [StandartPage, ProductImageCarousel, ReactiveFormsModule, SelectAmount, Dropdown, ProductCard, RouterLink, SelectCartModal],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductPage implements OnInit {
  productId!: string
  product: FetchProductById = emptyFetchProductById;
  recomendations!: ManyProducts;
  productBuffer!: ProductBuffer;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private modalService: ModalService, private cartService: CartService) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId')!
  }

  ngOnInit(): void {
    this.fetchProduct()
    this.fetchRecomendations()
  }

  fetchProduct() {
    const fetchProductSubscription = this.productService.fetchById(this.productId).subscribe({
      next: (v) => {
        if (!v.body) return;
        this.product = v.body.product;

        // setting up the productBuffer
        this.productBuffer = {
          productId: this.productId,
          amount: 1
        }
        console.log(this.productBuffer)
      },
      complete: () => {
        fetchProductSubscription.unsubscribe()
      }
    })
  }

  changeProductBufferAmount(amount: number) {
    this.productBuffer.amount = amount
  } 

  fetchRecomendations() {
    const recomendationFetchSubscription = this.productService.fetchManyProducts(8).subscribe({
      next: (v) => {
        if (!v.body) return
        this.recomendations = v.body.products
      },
      complete: () => {
        recomendationFetchSubscription.unsubscribe()
      }
    })
  }

  toggleSelectCartModal() {
    this.modalService.toggle('select.cart')
  }

  insertProductToCart(cartId: string) {
    this.cartService.insertProductToCart(cartId, this.productBuffer.productId, this.productBuffer.amount)
  }
}
