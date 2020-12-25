import {Component, OnDestroy, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {AddExpenseComponent} from '../../shared/components/add-expense/add-expense.component';
import {DataService} from '../../services/data/data.service';
import {ExpenseInterface} from '../../interfaces/ExpenseInterface';
import {SubscriptionLike} from 'rxjs';
import {ActionService} from "../../services/action/action.service";
import {DatetimeService} from "../../services/datetime/datetime.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  expenses: ExpenseInterface[];
  subscription: SubscriptionLike;
  todayDate: Date;
  installDate: Date;
  selectedDate: Date;

  constructor(
      private modalController: ModalController,
      private dataService: DataService,
      private actionService: ActionService,
      private datetimeService: DatetimeService
  ) {
    this.actionService.getTodayExpensesFromLocal().then((value => this.expenses = value));
    this.todayDate = this.datetimeService.todayDate;
    this.installDate = this.datetimeService.installDate;
    this.selectedDate = this.datetimeService.getCurrentDateTime();
  }

  ngOnInit() {
    this.subscription = this.dataService.getExpensesSubscription()
        .subscribe({
          next: (expense) => {
            if(!this.expenses) {
              this.expenses = [];
            }
            if (expense != null){
              this.expenses.push(expense);
            }
          },
          error: (err) => {},
          complete: () => {}
        });
  }

  async presentModal(){
    const modal = await this.modalController.create({
      component: AddExpenseComponent
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
  }

  changeSelectedDate(value): void {
    this.datetimeService.selectedDate = this.datetimeService.createDateFromString(value);
    this.selectedDate = this.datetimeService.selectedDate;
  }

  setCurrentToTodayDate(): void {
    this.todayDate = this.datetimeService.getCurrentDateTime();
    this.selectedDate = this.datetimeService.getCurrentDateTime();
  }
}
