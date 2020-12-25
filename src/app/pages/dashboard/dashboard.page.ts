import {Component, OnDestroy, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {AddExpenseComponent} from '../../shared/components/add-expense/add-expense.component';
import {DataService} from '../../services/data/data.service';
import {ExpenseInterface} from '../../interfaces/ExpenseInterface';
import {SubscriptionLike} from 'rxjs';
import {ActionService} from "../../services/action/action.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  expenses: ExpenseInterface[];
  subscription: SubscriptionLike;

  constructor(
      private modalController: ModalController,
      private dataService: DataService,
      private actionService: ActionService
  ) {
    this.expenses = [];
    this.actionService.getTodayExpensesFromLocal().then((value => this.expenses = value));
  }

  ngOnInit() {
    this.subscription = this.dataService.getExpensesSubscription()
        .subscribe({
          next: (expense) => {
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
}
