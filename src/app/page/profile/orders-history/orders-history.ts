import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryItem } from '../../../widget/history-item/history-item';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-history',
  imports: [HistoryItem, DatePipe],
  templateUrl: './orders-history.html',
  styleUrl: './orders-history.css'
})
export class OrdersHistoryPage {
testDate = new Date()
}
