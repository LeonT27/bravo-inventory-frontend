import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TransactionType } from './transactionType';
import { TransactionTypeService } from './transactionType.service';

import { Transaction } from './transaction';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {
  transactionTypes: TransactionType[] = [];
  productId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private transactionTypeService: TransactionTypeService,
    private transactionService: TransactionService
    ) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.transactionTypeService.getTransactionTypes().subscribe({
      next: transactionTypes => {
      this.transactionTypes = transactionTypes;
      }
    });
  }

  add(transaction: Transaction): void {
    if (!transaction) { return; }
    transaction.productId = this.productId;
    console.log(JSON.stringify(transaction));
    this.transactionService.addTransaction(transaction).subscribe();
  }

  toInt(s: string): number {
    return parseInt(s);
  }

}
