import { Injectable } from '@angular/core';
import {DataService} from '../data/data.service';
import {ExpenseInterface} from '../../interfaces/ExpenseInterface';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private dataService: DataService) {
  }

  async createExpense(expanse: ExpenseInterface): Promise<void> {
    return this.dataService.setExpenses(expanse);
  }
}
