import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ExpenseInterface} from '../../interfaces/ExpenseInterface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly expenses: BehaviorSubject<ExpenseInterface[]>;
  private readonly _todayTotalExpenses: BehaviorSubject<number>;

  constructor() {
    this.expenses = new BehaviorSubject<ExpenseInterface[]>(null);
    this._todayTotalExpenses = new BehaviorSubject<number>(0);
  }

  getTodayTotalSubscription(): BehaviorSubject<number>{
    return this._todayTotalExpenses;
  }

  async setTotalExpense(total: number): Promise<void>{
    return this._todayTotalExpenses.next(total);
  }

  async getExpenses(): Promise<ExpenseInterface[]> {
    return this.expenses.getValue();
  }

  async setExpenses(expenses: ExpenseInterface[]): Promise<void> {
    if(expenses) {
      this.setTotalExpense(this.calculateTodayTotal(expenses));
    }
    return this.expenses.next(expenses);
  }

  getExpensesSubscription(): BehaviorSubject<ExpenseInterface[]> {
    return this.expenses;
  }

  calculateTodayTotal(expenses: ExpenseInterface[]): number {
    let total = 0;
    for (const expense of expenses){
      total += expense.amount;
    }
    return total;
  }
}
