import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import {AddExpenseComponent} from '../../shared/components/add-expense/add-expense.component';
import {DataService} from '../../services/data/data.service';
import {ExpenseInterface} from '../../interfaces/ExpenseInterface';
import {SubscriptionLike} from 'rxjs';
import {ActionService} from "../../services/action/action.service";
import {DatetimeService} from "../../services/datetime/datetime.service";
import {ExpensesTypes} from "../../constants/constants";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  expenses: ExpenseInterface[];
  subscription: SubscriptionLike;
  dateSubscription: SubscriptionLike;
  installDate: Date;
  selectedDate: Date;
  todayDate: Date;
  expensesType: any;
  totalSubscription: SubscriptionLike;
  todayTotal: number;
  filterByPrice: boolean;
  filter: boolean;

  constructor(
      private modalController: ModalController,
      private dataService: DataService,
      private actionService: ActionService,
      private datetimeService: DatetimeService,
      private actionSheetController: ActionSheetController
  ) {
    this.installDate = this.datetimeService.installDate;
    this.todayDate = this.datetimeService.getCurrentDateTime();
    this.expensesType = ExpensesTypes;
    this.todayTotal = null;
  }

  ngOnInit() {
    this.totalSubscription = this.dataService.getTodayTotalSubscription()
        .subscribe({
            next: (total: number) => {
               this.todayTotal = total;
            },
            error: (err) => {},
            complete: () => {}
        });
    this.dateSubscription = this.datetimeService.getSelectedDateSubscription()
        .subscribe({
          next: (date: Date) => {
            this.selectedDate = date
          },
          error: (err) => {},
          complete: () => {}
        })
    this.subscription = this.dataService.getExpensesSubscription()
        .subscribe({
          next: (expense: ExpenseInterface []) => {
            if (expense != null){
                this.expenses = expense;
            } else {
                this.expenses = [];
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
    this.selectedDate = this.datetimeService.createDateFromString(value);
    this.datetimeService.setSelectedDate(value).then(() => {
        this.actionService.emitExpensesByDateFromLocal(this.selectedDate);
    });
  }

  setCurrentToTodayDate(): void {
      this.datetimeService.setSelectedDate(this.datetimeService.getCurrentDateTime()).then(() => {
          this.actionService.emitExpensesByDateFromLocal(this.selectedDate);
      });
  }

  async presentFilterActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Price',
        icon: 'logo-usd',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Recent',
        icon: 'cellular-outline',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  priceFilter(): void {
    this.expenses = this.expenses.sort((a, b) => {
      if(a.amount > b.amount) 
        return this.filterByPrice ? 1 : -1;
      if(b.amount > a.amount) 
        return this.filterByPrice ? -1 : 1; 
      return 0;
    });
    this.filter = true;
    this.filterByPrice = !this.filterByPrice;
  }
}
