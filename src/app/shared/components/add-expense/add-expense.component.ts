import { ExpenseStorageService } from './../../../services/expense-storage/expense-storage.service';
import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatetimeService} from '../../../services/datetime/datetime.service';
import {ExpenseInterface} from "../../../interfaces/ExpenseInterface";
import {ExpensesTypes} from "../../../constants/constants";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

  expenseForm: ExpenseInterface;
  expensesType: any;

  constructor(
      private modalController: ModalController,
      private expenseStorage: ExpenseStorageService,
      private datetimeService: DatetimeService
  ) {
    this.expensesType = ExpensesTypes;
  }

  addExpenseForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    description: new FormControl(''),
    type: new FormControl('', Validators.required),
  });

  ngOnInit() { }

  initCreateExpanse(): void {
    const expense = this.addExpenseForm.value;
    expense.amount = Number(expense.amount.toFixed(2));
    this.datetimeService.getSelectedDate()
        .then((date: Date) => {
          if(!expense.createdOn) {
            expense.createdOn = date;
          }
        })
        .then(() => {
          this.expenseStorage.createExpense(expense).then(() => {
          console.log('Expanse created with Success');
          this.dismissModal();
        }).catch((err) => console.log(err));
    });
  }

  dismissModal(): void {
    this.modalController.dismiss().then().catch();
  }
}
