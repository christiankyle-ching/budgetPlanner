import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, ToastController, AlertController, Platform } from '@ionic/angular';

import { AddExpensePage } from '../add-expense/add-expense.page';
import { Expense, Allowance } from '../../../models/expense.model';
import { DataService } from '../../../services/data.service';
import { AddAllowancePage } from '../add-allowance/add-allowance.page';
import { BudgetTodayMenuComponent } from '../budget-today-menu/budget-today-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-today',
  templateUrl: './budget-today.page.html',
  styleUrls: ['./budget-today.page.scss'],
})
export class BudgetTodayPage implements OnInit {

  expenses: Array<Expense>;
  allowances: Array<Allowance>;

  currentDate: Date;

  txtTotalAllowances = 0;
  txtTotalExpenses = 0;
  txtTotalSavings = 0;

  //Imports
  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private plt: Platform,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.initApp();
  }

  initApp() {
    this.dataService.reloadDayItem().then(() => {
      setTimeout(() => {
        this.refresh();
      }, 500);
    });

    this.currentDate = this.dataService.getDate();
  }










  //#region Expenses

  addExpense() {
    this.presentAddExpenseModal();
  }

  removeExpense(ex: Expense) {
    this.dataService.removeExpense(ex);

    this.refresh();
  }

  async presentAddExpenseModal() {
    const modal = await this.modalCtrl.create({
      component: AddExpensePage
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.refresh();

      if (data.addedNewData == true) {
        this.presentToast(`Added Expense/s: ${data.name}`);
      }
    }

    return;
  }

  //#endregion








  //#region Allowance

  addAllowance() {
    this.presentAddAllowanceModal();
  }

  removeAllowance(a: Allowance) {
    this.dataService.removeAllowance(a);
    this.presentToast(`Removed Allowance: ${a.name}.`);
    this.refresh();
  }

  async presentAddAllowanceModal() {
    const modal = await this.modalCtrl.create({
      component: AddAllowancePage
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.refresh();

      if (data.addedNewData == true) {
        this.presentToast(`Added Allowance: ${data.name}`);
      }
    }

    return;
  }

  //#endregion

  async presentMenu(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: BudgetTodayMenuComponent,
      event: ev, //for the popover to know where it was triggered
      translucent: true
    });
    return await popover.present();
  }

  async presentToast(pMessage: string) {
    const toast = await this.toastCtrl.create({
      message: pMessage,
      translucent: true,
      duration: 2000
    });
    toast.present();
  }

  async confirmRemoveAllowance(a: Allowance) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Action',
      message: `Delete <strong>Allowance: ${a.name}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            this.removeAllowance(a);
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmRemoveExpense(ex: Expense) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Action',
      message: `Delete <strong>Expense: ${ex.name}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            this.removeExpense(ex);
          }
        }
      ]
    });

    await alert.present();
  }









  refresh() {
    this.txtNote = this.dataService.getNote();
    this.expenses = this.dataService.getExpenses();
    this.allowances = this.dataService.getAllowances();

    this.txtTotalAllowances = this.dataService.getTotalAllowance();
    this.txtTotalExpenses = this.dataService.getTotalExpenses();
    this.txtTotalSavings = this.dataService.getTotalSavings();

    setTimeout(() => {
      this.compute();
    }, 100);

  }






  logAll() {
    this.dataService.log();
  }








  remainingBalance = 0;

  compute() {
    this.dataService.reloadDBMonthItems(this.currentDate.getMonth(), this.currentDate.getFullYear()).then((res: any[]) => {

      setTimeout(() => {
        let sum = 0;

        for (let item of res) {
          sum += item.savings;
        }

        this.remainingBalance = sum;
      }, 100);

    });
  }




  txtNote = '';
  updateNote() {
   this.dataService.updateNote(this.txtNote) 
  }



}
