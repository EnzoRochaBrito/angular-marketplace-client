import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageCarousel } from './product-image-carousel';

describe('ProductImageCarousel', () => {
  let component: ProductImageCarousel;
  let fixture: ComponentFixture<ProductImageCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductImageCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductImageCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
