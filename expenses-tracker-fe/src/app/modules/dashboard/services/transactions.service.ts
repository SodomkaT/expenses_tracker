import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TransactionModel} from "../../../core/models/transaction.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private http: HttpClient,
  ) { }

  getTransactions() {
    return this.http.get<TransactionModel[]>(environment.transactionsUrl);
  }

  addTransaction(transaction: TransactionModel) {
    return this.http.post<TransactionModel>(environment.transactionsUrl, transaction);
  }

  deleteTransaction(transactionId: string) {
    return this.http.delete<TransactionModel>(`${environment.transactionsUrl}/${transactionId}`);
  }
}
