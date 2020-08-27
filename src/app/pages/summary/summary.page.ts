import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { dbDayItem } from 'src/app/models/expense.model';
import { ModalController, LoadingController } from '@ionic/angular';
import { SummaryDayPage } from './summary-day/summary-day.page';

import * as _ from 'lodash';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  selectedDate;
  currentDate;
  viewDate;
  txtDate;
  txtTotalSavings = 0;
  items: any = [];
  
  
  // calendar
  daysLabel = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];

  offset = [];

  savings = [];
  allowances = [];
  topAllowances = [];
  expenses = [];
  topExpenses = [];

  dayItems: Array<dbDayItem>;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    // this.loadData(); //TEMP
    this.currentDate = new Date().toISOString();
  }

  fetchData() {
    const date = new Date(this.selectedDate);
    this.txtDate = `Summary for ${this.dataService.toMonthOfYear(date.getMonth())} of ${date.getFullYear()}`;
    this.dataService.reloadDBMonthItems(date.getMonth(), date.getFullYear()).then(res => {
      this.items = res;
      console.log('FETCHED: ', this.items);

      setTimeout(() => {

        this.calculateOffset();

        this.savings = this.getSavings();
        this.txtTotalSavings = this.getTotalSavings();
        this.getAllowances();
        this.getTop10Allowances();
        this.getExpenses();
        this.getTop10Expenses();

      }, 500);

    });
  }


  calculateOffset() {
    const selectedDate = new Date(this.selectedDate);
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    this.offset = [];
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      this.offset.push({});
    }
  }



  async presentDayDataModal(pKey, pDate) {
    const modal = await this.modalCtrl.create({
      component: SummaryDayPage,
      componentProps: {
        key: pKey,
        date: pDate
      }
    });

    return await modal.present();
  }

  async load() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 1000,
    });

    await loading.present();

    this.viewDate = this.selectedDate;

    //get all items
    this.fetchData();

  }

  getAllowances() {
    //get allowances first
    let tmpAllowances = _.map(this.items, (el) => {
      return el.allowances;
    });

    //combine all arrays of allowances
    this.allowances = tmpAllowances.reduce((acc, cur) => {
      return acc.concat(cur);
    });
    console.log('Allowances for Month: ', this.allowances);

    return this.allowances;
  }

  getTotalAllowance(): number {
    let sum = 0;
    this.allowances.forEach(e => {
      sum += e.amount;
    });
    return sum;
  }

  getExpenses() {
    //get expenses first
    let tmpExpenses = _.map(this.items, (el) => {
      return el.expenses;
    });

    //combine all arrays of allowances
    this.expenses = tmpExpenses.reduce((acc, cur) => {
      return acc.concat(cur);
    });
    console.log('Expenses for Month: ', this.expenses);
    return this.expenses;
  }

  getTotalExpenses(): number {
    let sum = 0;
    this.expenses.forEach(e => {
      sum += e.amount;
    });
    return sum;
  }


  getTop10Allowances() {
    //group by name
    let tmpGroupAllowances = _.groupBy(this.allowances, 'name');

    //get sum for each group and their name, push to the array
    let topAllowances = [];
    _.map(tmpGroupAllowances, (alGrp) => {
      //compute for total amount
      let sum = 0;
      alGrp.forEach((e) => {
        sum += e.amount;
      })

      topAllowances.push({
        name: alGrp[0].name,
        amount: sum
      }
      );
    });

    //sort by amount
    topAllowances = _.orderBy(topAllowances, 'amount', 'desc');

    //slice the array and set it to class var
    this.topAllowances = topAllowances.slice(0, 9);
  }


  getTop10Expenses() {
    //group by name
    let tmpGroupExpenses = _.groupBy(this.expenses, 'name');

    //get sum for each group and their name, push to the array
    let topExpenses = [];
    _.map(tmpGroupExpenses, (exGrp) => {
      //compute for total amount
      let sum = 0;
      exGrp.forEach((e) => {
        sum += e.amount;
      })

      topExpenses.push({
        name: exGrp[0].name,
        amount: sum
      }
      );
    });

    //sort by amount
    topExpenses = _.orderBy(topExpenses, 'amount', 'desc');

    //slice the array and set it to class var
    this.topExpenses = topExpenses.slice(0, 9);
  }

  getSavings(): Array<any> {
    let savings = [];
    _.map(this.items, el => {
      savings.push({
        date: el.date,
        savings: el.savings
      });
    })
    return savings;
  }

  getTotalSavings(): number {
    let sum = 0;
    this.getSavings().forEach(el => {
      sum += el.savings;
    });
    return sum;
  }

  getHighestSavingsDate() {
    let amount = 0;
    let date = '';
    this.savings.forEach(el => {
      if (el.savings > amount) {
        amount = el.savings;
        date = el.date;
      }
    });

    if (amount > 0) {
      return date;
    } else {
      return null;
    }
  }

  getHighestExpenseDate() {
    let amount = 0;
    let date = '';
    this.savings.forEach(el => {
      if (el.savings < amount) {
        amount = el.savings;
        date = el.date;
      }
    });

    if (amount < 0) {
      return date;
    } else {
      return null;
    }
  }

  searchItem(date: string) {
    this.items.forEach(el => {
      if (el.date == date) {
        this.presentDayDataModal(el.key, el.date);
        return;
      }
    });
  }


  showSummaryAllowance() {
    this.dataService.setTempItem('topAllowances', this.topAllowances);
    this.router.navigateByUrl('/home/summary/allowance');
  }

  showSummaryExpense() {
    this.dataService.setTempItem('topExpenses', this.topExpenses);
    this.router.navigateByUrl('/home/summary/expenses');
  }



}
