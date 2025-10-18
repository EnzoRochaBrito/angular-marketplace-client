import { Component, OnInit } from '@angular/core';
import { StandartPage } from '../../../template/standart-page/standart-page';
import { ProductCard } from '../../../widget/product-card/product-card';
import { ProductService } from '../../../service/product/product';
import { ManyProducts } from '../../../utils/types/product.dto';

@Component({
  selector: 'app-landing',
  imports: [StandartPage, ProductCard],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit {
  manyProducts!: ManyProducts;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts()  
  }
  
  fetchProducts() {
    const fetchManyProductsSubscription = this.productService.fetchManyProducts(20).subscribe({
      next: (v) => {
        if (!v.body) return;
        this.manyProducts = v.body.products
      },
      complete: () => {
        fetchManyProductsSubscription.unsubscribe()
      }
    })
  }
}
