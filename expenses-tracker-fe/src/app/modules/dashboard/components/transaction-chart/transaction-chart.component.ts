import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {TransactionModel} from "../../../../core/models/transaction.model";

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss']
})
export class TransactionChartComponent {

  maxYValue: number = 0;
  xItems: Date[] = [];

  transactions: TransactionModel[] | null = [];

  @Input() set transactionList(value: TransactionModel[] | null) {
    this.transactions = value;
    this.maxYValue = Math.max(
      ...this.xItems.map(day => {
        return Math.max(
          this.dailySum(day, 'EXPENSE'),
          this.dailySum(day, 'INCOME'),
        );
      })
    );
  }

  constructor() {
    for (let i = 0; i < 14; i++) {
      let day: Date = new Date();
      day.setDate(day.getDate() - i);
      this.xItems.unshift(day);
    }
  }

  dailySum(day: Date, transactionType: string) {
    const dailyTransaction = this.transactions?.filter(transaction => transaction.type === transactionType && new Date(transaction.date).toDateString() === day.toDateString());
    if (dailyTransaction) {
      const sum = dailyTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
      return sum;
    } else {
      return 0;
    }
  }
}
