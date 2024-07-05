import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {BehaviorSubject} from "rxjs";
import {TransactionsService} from "./services/transactions.service";
import {TransactionModel} from "../../core/models/transaction.model";
import {NbDialogService} from "@nebular/theme";
import {AddTransactionDialogComponent} from "./components/add-transaction-dialog/add-transaction-dialog.component";
import {EditCategoriesDialogComponent} from "./components/edit-categories-dialog/edit-categories-dialog.component";
import {CategoriesService} from "./services/categories.service";
import {CategoryModel} from "../../core/models/category.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  transactions$: BehaviorSubject<TransactionModel[]> = new BehaviorSubject<TransactionModel[]>([]);
  categories$: BehaviorSubject<CategoryModel[]> = new BehaviorSubject<CategoryModel[]>([]);

  constructor(
    private authService: AuthService,
    private categoryService: CategoriesService,
    private dialogService: NbDialogService,
    private transactionsService: TransactionsService
  ) {
  }

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe({
      next: (transactions: TransactionModel[]) => {
        this.transactions$.next(this.sortTransactions(transactions));
      }
    });
    this.categoryService.getCategories().subscribe({
      next: (categories: CategoryModel[]) => {
        this.categories$.next(categories);
      }
    });
  }

  addTransactionDialog() {
    this.dialogService.open(AddTransactionDialogComponent, {
      context: {
        categories$: this.categories$
      }
    })
      .onClose.subscribe((transaction: TransactionModel) => {
        if (transaction) {
          this.transactionsService.addTransaction(transaction).subscribe({
            next: (response: TransactionModel) => {
              this.transactions$.next([response, ...this.transactions$.value]);
            }
          });
        }
      }
    );
  }

  editCategoriesDialog() {
    this.dialogService.open(EditCategoriesDialogComponent, {
      context: {
        categories$: this.categories$
      }
    });
  }

  logout() {
    this.authService.logout().subscribe();
  }

  private sortTransactions(transactions: TransactionModel[]): TransactionModel[] {
    if (transactions) {
      return transactions.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
    return [];
  }
}
