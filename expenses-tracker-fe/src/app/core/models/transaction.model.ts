export interface TransactionModel {
  id?: string;
  amount: number;
  categoryId: string;
  date: string;
  description?: string;
  title: string;
  type: string;
}
