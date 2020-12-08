import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup} from '@angular/forms';
import {ActionService} from '../../../services/action/action.service';
import {DatetimeService} from '../../../services/datetime/datetime.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {

  constructor(
      private modalController: ModalController,
      private actionService: ActionService,
      private datetimeService: DatetimeService
  ) {}

  addExpenseForm = new FormGroup({
    amount: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
  });

  ngOnInit() {
  }

  initCreateExpanse(): void {
    const expense = this.addExpenseForm.value;
    expense.creditOn = this.datetimeService.getCurrentDateTime();
    this.actionService.createExpense(expense).then(() => {
      console.log('Expanse created with Success');
      this.dismissModal();
    }).catch((err) => console.log(err));
  }

  dismissModal(): void {
    this.modalController.dismiss().then().catch();
  }
}
