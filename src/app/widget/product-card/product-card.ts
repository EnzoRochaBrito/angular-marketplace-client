import { Component, Input } from '@angular/core';
import { MaxStrLenPipe } from '../../pipe/max-str-len-pipe';
import { RouterLink } from '@angular/router';
import { RedirectToUriDirective } from '../../utils/redirect-to-uri';

@Component({
  selector: 'product-card',
  imports: [MaxStrLenPipe, RedirectToUriDirective],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
@Input() id!: string
@Input() image!: string
@Input() name!: string
@Input() price!: number
}
