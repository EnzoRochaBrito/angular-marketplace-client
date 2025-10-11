import { Component, Input } from '@angular/core';
import { MaxStrLenPipe } from '../../pipe/max-str-len-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-card',
  imports: [MaxStrLenPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
@Input() id!: string
@Input() image!: string
@Input() name!: string
@Input() price!: number
}
