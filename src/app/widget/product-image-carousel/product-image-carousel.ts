import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-image-carousel',
  imports: [CommonModule],
  templateUrl: './product-image-carousel.html',
  styleUrl: './product-image-carousel.css'
})
export class ProductImageCarousel {
@Input() urls!: string[]
currentImageId: number = 0;

nextImage() {
  this.currentImageId = (this.currentImageId+1) % this.urls.length
}

previousImage() {
  this.currentImageId = Math.abs(this.currentImageId-1) % this.urls.length
}

setImage(id: number) {
  this.currentImageId = id
}

}
