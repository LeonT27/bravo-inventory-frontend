import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { History } from './history';
import { HistoryFilter } from './historyFilter';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.css']
})
export class ProductHistoryComponent implements OnInit {
  productId = 0;
  historyPresent = true;
  historys: History[] = [];

  constructor(
    private historyService: HistoryService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.getHistory(this.productId, null);
  }

  filterHistory(filter: HistoryFilter) {
    if(this.historyPresent) {
      this.getHistory(this.productId, filter);
    } else {
      this.getHistoryLosses(this.productId, filter);
    }
  }

  toggleHistory(): void {
    if(this.historyPresent) {
      this.getHistoryLosses(this.productId, null);
      this.historyPresent = false;
      return;
    }
    this.getHistory(this.productId, null);
    this.historyPresent = true;
  }

  getHistory(productId: number, filter: any): void {
    this.historyService.getHistory(productId, filter).subscribe({
      next: historys => {
        this.historys = historys;
      }
    });
  }

  getHistoryLosses(productId: number, filter: any): void {
    this.historyService.getHistoryLosses(productId, filter).subscribe({
      next: historys => {
        this.historys = historys;
      }
    });
  }

}
