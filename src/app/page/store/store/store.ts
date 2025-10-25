import { Component, OnInit } from '@angular/core';
import { StandartPage } from '../../../template/standart-page/standart-page';
import { ProductCard } from '../../../widget/product-card/product-card';
import { StoreService } from '../../../service/store/store';
import { ActivatedRoute } from '@angular/router';
import { FetchStore } from '../../../utils/types/store.dto';
import { ProductService } from '../../../service/product/product';
import { ManyProducts } from '../../../utils/types/product.dto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-store',
  imports: [StandartPage, ProductCard],
  templateUrl: './store.html',
  styleUrl: './store.css'
})
export class StorePage implements OnInit {
  storeId: string;
  store!: FetchStore;
  storeProducts!: ManyProducts;

  constructor(private storeService: StoreService, private activatedRoute: ActivatedRoute, private productService: ProductService, private titleService: Title) {
    this.storeId = this.activatedRoute.snapshot.paramMap.get('storeId')!
  }

  ngOnInit(): void {
    this.fetchStoreInfo()
    this.fetchStoreProducts()
  }

  fetchStoreProducts() {
    const fetchStoreProductSubscription = this.productService.fetchManyProducts(20, undefined, this.storeId).subscribe({
      next: (v) => {
        if (!v.body) return
        this.storeProducts = v.body.products
      },
      complete: () => {
        fetchStoreProductSubscription.unsubscribe()
      }
    })
  }

  fetchStoreInfo() {
    const fetchStoreSubscription = this.storeService.fetchStore(this.storeId).subscribe({
      next: (v) => {
        if (!v.body) return
        this.store = v.body
        this.changePageTitleToStore(this.store.name)
      },
      complete: () => {
        fetchStoreSubscription.unsubscribe()
      }
    })
  }

  changePageTitleToStore(productName: string) {
    this.titleService.setTitle(productName)
  }
}
