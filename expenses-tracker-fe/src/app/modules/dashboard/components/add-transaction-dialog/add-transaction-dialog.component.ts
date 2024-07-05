import { Component } from '@angular/core';
import {NbDialogRef, NbDialogService} from "@nebular/theme";
import {TransactionModel} from "../../../../core/models/transaction.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../services/categories.service";
import {BehaviorSubject} from "rxjs";
import {CategoryModel} from "../../../../core/models/category.model";
import {EditCategoriesDialogComponent} from "../edit-categories-dialog/edit-categories-dialog.component";

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.component.html',
  styleUrls: ['./add-transaction-dialog.component.scss']
})
export class AddTransactionDialogComponent {

  transaction: TransactionModel = {
    title: '',
    amount: 0,
    date: new Date().toString(),
    type: 'EXPENSE',
    categoryId: '',
  };

  transactionForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    amount: new FormControl(0, [Validators.min(0.01), Validators.required]),
    date: new FormControl('', [Validators.required]),
    type: new FormControl('EXPENSE', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
  });

  categories$: BehaviorSubject<CategoryModel[]> = new BehaviorSubject<CategoryModel[]>([]);

  constructor(
    private dialogService: NbDialogService,
    private dialogRef: NbDialogRef<AddTransactionDialogComponent>,
    private categoriesService: CategoriesService,
  ) {

    this.transactionForm.valueChanges.subscribe((value) => {
      this.transaction = {
        ...this.transaction,
        ...value,
      };
    });
  }

  editCategoriesDialog() {
    this.dialogService.open(EditCategoriesDialogComponent, {
      context: {
        categories$: this.categories$
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  addTransaction() {
    this.dialogRef.close(this.transaction);
  }

  updateTransactionType($event: any[]) {
    this.transactionForm.patchValue({type: $event[0]});
  }
}
