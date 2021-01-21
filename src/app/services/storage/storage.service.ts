import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {ExpenseInterface} from "../../interfaces/ExpenseInterface";
import {DatetimeService} from "../datetime/datetime.service";
import {DataService} from "../data/data.service";


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
      private datetimeService: DatetimeService,
      private dataService: DataService
  )
  { }

  async saveExpenseToLocal(expense: ExpenseInterface): Promise<void>{
    const key = this.datetimeService.getDateTimeISOWithFormat(expense.createdOn);
    let expensesList: ExpenseInterface[] = [];
    return this.getFromLocalStorage(key).then((expenses: ExpenseInterface[]) => {
      if(expenses == null){
        expensesList.push(expense);
      }else {
        expensesList = expenses;
        expensesList.push(expense);
      }
    }).then(() => {
      this.saveToLocalStorage(key, expensesList).then(() => {
        this.dataService.setExpenses(expensesList);
      });
    }).catch((error) => console.log(error));
  }

  async getExpensesFromLocal(date?: Date): Promise<ExpenseInterface[]> {
    const key = date ? this.datetimeService.getDateTimeISOWithFormat(date) : this.datetimeService.getDateTimeISOWithFormat();
    return await this.getFromLocalStorage(key).then((expenses: ExpenseInterface[]) => {
      return expenses;
    });
  }

  async saveToLocalStorage(key: string, value: any): Promise<void> {
    return await Plugins.Storage.set({
      key,
      value: JSON.stringify(value)
    });
  }

  async getFromLocalStorage(key: string): Promise<any> {
    const ret = await Plugins.Storage.get({key});
    return JSON.parse(ret.value);
  }

  async removeFromLocalStorage(key: string): Promise<void> {
    return await Plugins.Storage.remove({ key });
  }

  async clearLocalStorage(isReset?: boolean): Promise<void> {
    if(isReset){
      this.dataService.setExpenses([]);
    }
    return await Plugins.Storage.clear();
  }
}
