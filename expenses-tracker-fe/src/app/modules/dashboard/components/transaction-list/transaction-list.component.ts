import {Component, Input} from '@angular/core';
import {TransactionModel} from "../../../../core/models/transaction.model";
import {TransactionsService} from "../../services/transactions.service";
import {CategoriesService} from "../../services/categories.service";
import {CategoryModel} from "../../../../core/models/category.model";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {

  @Input() categories: CategoryModel[] = [];

  @Input() transactions: TransactionModel[] | undefined = [];

  constructor(
    private transactionService: TransactionsService,
  ) {
  }

  deleteTransaction(id: string | undefined) {
    if (id) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => {
          this.transactions = this.transactions?.filter(transaction => transaction.id !== id);
        }
      });
    }
  }

  getTransactionCategory(categoryId: string): string {
    if (this.categories) {
      return this.categories.find(category => category.id === categoryId)?.title || '';
    }
    return '';
  }
}
