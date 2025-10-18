import { Component, OnInit } from '@angular/core';
import { StandartPage } from '../../../template/standart-page/standart-page';
import { ProductImageCarousel } from '../../../widget/product-image-carousel/product-image-carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectAmount } from '../../../widget/select-amount/select-amount';
import { Dropdown } from '../../../widget/dropdown/dropdown';
import { ProductCard } from '../../../widget/product-card/product-card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../service/product/product';
import { emptyFetchProductById, FetchProductById, ManyProducts } from '../../../utils/types/product.dto';

@Component({
  selector: 'app-product',
  imports: [StandartPage, ProductImageCarousel, ReactiveFormsModule, SelectAmount, Dropdown, ProductCard, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductPage implements OnInit {
  productId!: string
  product: FetchProductById = emptyFetchProductById;
  recomendations!: ManyProducts;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
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
      },
      complete: () => {
        fetchProductSubscription.unsubscribe()
      }
    })
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
}
