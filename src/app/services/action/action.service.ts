import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { ExpenseInterface } from '../../interfaces/ExpenseInterface';
import { StorageService } from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
      private dataService: DataService,
      private storageService: StorageService
  ) {
    this.getTodayExpensesFromLocal();
  }

  async createExpense(expense: ExpenseInterface): Promise<void> {
    return await this.storageService.saveExpenseToLocal(expense).then().catch();
  }

  async getTodayExpensesFromLocal(): Promise<void> {
    return await this.storageService.getExpensesFromLocal().then((expenses: ExpenseInterface[]) => {
      this.dataService.setExpenses(expenses);
    });
  }

  async emitExpensesByDateFromLocal(date: Date): Promise<void> {
    return this.storageService.getExpensesFromLocal(date).then((expenses) => {
      this.dataService.setExpenses(expenses)
    })
  }
}
