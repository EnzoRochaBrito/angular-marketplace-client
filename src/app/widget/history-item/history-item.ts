import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaxStrLenPipe } from '../../pipe/max-str-len-pipe';

@Component({
  selector: 'history-item',
  imports: [RouterLink, MaxStrLenPipe],
  templateUrl: './history-item.html',
  styleUrl: './history-item.css'
})
export class HistoryItem {
  @Input() itemId!: string;
  @Input() itemImage!: string;
  @Input() itemName!: string;
  @Input() itemAmount!: number;
  @Input() itemPrice!: number;
}
