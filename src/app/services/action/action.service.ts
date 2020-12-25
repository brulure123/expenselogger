import { Injectable } from '@angular/core';
import {DataService} from '../data/data.service';
import {ExpenseInterface} from '../../interfaces/ExpenseInterface';
import {StorageService} from "../storage/storage.service";
import {DatetimeService} from "../datetime/datetime.service";

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(
      private dataService: DataService,
      private storageService: StorageService,
      private datetimeService: DatetimeService
  ) {}

  async createExpense(expense: ExpenseInterface): Promise<void> {
    await this.storageService.saveExpenseToLocal(expense);
    return this.dataService.setExpenses(expense);
  }

  async getTodayExpensesFromLocal(): Promise<ExpenseInterface[]> {
    return await this.storageService.getExpensesFromLocal().then((expenses: ExpenseInterface[]) => {
      return expenses;
    });
  }
}
