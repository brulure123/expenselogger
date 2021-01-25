import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import {ExpenseInterface} from "../../interfaces/ExpenseInterface";
import {DatetimeService} from "../datetime/datetime.service";
import {DataService} from "../data/data.service";


@Injectable({
  providedIn: 'root'
})
export class ExpenseStorageService {

  constructor(
    private datetimeService: DatetimeService,
    private dataService: DataService,
    private storageService: StorageService
  ) { 
    this.getTodayExpensesFromLocal();    
  }

  async createExpense(expense: ExpenseInterface): Promise<void> {
    return await this.saveExpenseToLocal(expense).then().catch();
  }

  async getTodayExpensesFromLocal(): Promise<void> {
    return await this.getExpensesFromLocal().then((expenses: ExpenseInterface[]) => {
      this.dataService.setExpenses(expenses);
    });
  }

  async emitExpensesByDateFromLocal(date: Date): Promise<void> {
    return this.getExpensesFromLocal(date).then((expenses) => {
      this.dataService.setExpenses(expenses)
    })
  }

  async saveExpenseToLocal(expense: ExpenseInterface): Promise<void>{
    const key = this.datetimeService.getDateTimeISOWithFormat(expense.createdOn);
    let expensesList: ExpenseInterface[] = [];
    return this.storageService.getFromLocalStorage(key).then((expenses: ExpenseInterface[]) => {
      if(expenses == null){
        expensesList.push(expense);
      }else {
        expensesList = expenses;
        expensesList.push(expense);
      }
    }).then(() => {
      this.storageService.saveToLocalStorage(key, expensesList).then(() => {
        this.dataService.setExpenses(expensesList);
      });
    }).catch((error) => console.log(error));
  }


  async getExpensesFromLocal(date?: Date): Promise<ExpenseInterface[]> {
    const key = date ? this.datetimeService.getDateTimeISOWithFormat(date) : this.datetimeService.getDateTimeISOWithFormat();
    return await this.storageService.getFromLocalStorage(key).then((expenses: ExpenseInterface[]) => {
      return expenses;
    });
  }
}
