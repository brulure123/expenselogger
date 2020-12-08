import {Component, OnDestroy, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {AddExpenseComponent} from '../../shared/components/add-expense/add-expense.component';
import {DataService} from '../../services/data/data.service';
import {ExpenseInterface} from '../../interfaces/ExpenseInterface';
import {SubscriptionLike} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  expenses: ExpenseInterface[];
  subscription: SubscriptionLike;

  constructor(private modalController: ModalController, private dataService: DataService) {
    this.expenses = [];
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
