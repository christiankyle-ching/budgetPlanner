import { Injectable } from '@angular/core';
import { Expense, ExpensesTemplate, Allowance, dbDayItem } from '../models/expense.model';
import { Storage } from '@ionic/storage';
import { BackupService } from './backup.service';

const PREFIX_ITEM = 'DAY_';
const TEMPLATE_KEY = 'TEMPLATES';
const THEME_KEY = 'PREFERS_DARK';
const TUTORIAL_KEY = 'SHOW_TUTORIAL';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  note: string = '';

  expenses: Array<Expense> = [];
  allowances: Array<Allowance> = [];

  templates: Array<ExpensesTemplate> = [];

  KEY: string;

  currentDate: Date;

  month: number;
  day: number;
  year: number;

  constructor(
    private storage: Storage,
    private backupService: BackupService
  ) {

    // init KEY
    this.currentDate = new Date();

    this.month = this.currentDate.getMonth();
    this.day = this.currentDate.getDate();
    this.year = this.currentDate.getFullYear();

    this.KEY = PREFIX_ITEM + this.year + this.month + this.day;

    this.reloadDayItem();
    this.reloadTemplates();
  }

  //#region Dates

  toDayOfWeek(n: number): string {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    return days[n];
  }

  toMonthOfYear(n: number): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return months[n];
  }

  getDate(): Date {
    return this.currentDate;
  }
  //#endregion






  reloadDayItem() {
    return this.storage.get(this.KEY).then((item) => {
      console.log('Get DB Items');

      this.allowances = item.allowances;
      this.expenses = item.expenses;
      this.note = item.note;
    })
      .catch(() => {
        console.log('No Existing Detected. Creating a new one.');

        this.storage.set(this.KEY, {
          allowances: [],
          expenses: [],
          savings: 0,
          date: this.currentDate.toISOString(),
          note: ''
        });
      });
  }

  reloadDayItemWithKey(key) {
    return this.storage.get(key);
  }





  //#region Allowances 

  getAllowances() {
    return this.allowances;
  }

  addAllowance(a: Allowance) {
    console.log('Saved: ', a);
    this.allowances.push(a);

    this.updateDBItem();
  }

  removeAllowance(a: Allowance) {
    const index = this.allowances.indexOf(a);
    this.allowances.splice(index, 1);

    this.updateDBItem();
  }

  getTotalAllowance() {
    let sum = 0;

    if (this.allowances) {
      this.allowances.forEach(e => {
        sum += e.amount;
      });
    }

    return sum;
  }

  //#endregion






  //#region Expenses

  getExpenses() {
    return this.expenses;
  }

  addExpense(e: Expense) {
    console.log('Saved: ', e);
    this.expenses.push(e);

    this.updateDBItem();
  }

  addExpenses(expenses: Array<Expense>) {
    expenses.forEach(e => {
      this.expenses.push(e);
    });

    this.updateDBItem();
  }

  removeExpense(ex: Expense) {
    const index = this.expenses.indexOf(ex);
    this.expenses.splice(index, 1);

    this.updateDBItem();
  }

  getTotalExpenses() {
    let sum = 0;

    if (this.expenses) {
      this.expenses.forEach(e => {
        sum += e.amount;
      });
    }

    return sum;
  }

  //#endregion








  getTotalSavings() {
    return this.getTotalAllowance() - this.getTotalExpenses();
  }



  getNote() {
    return this.note;
  }

  updateNote(note) {
    this.note = note;
    this.updateDBItem();
  }








  updateDBItem() {

    return this.storage.set(this.KEY, {
      allowances: this.allowances,
      expenses: this.expenses,
      savings: this.getTotalSavings(),
      date: this.currentDate.toISOString(),
      note: this.note
    })
      .then(() => {
        console.log('Update DB');
        this.reloadDayItem();
      });
  }


  getKeys(month: number, year: number) {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    let keys = [];
    days.forEach((d: Date) => {
      keys.push({
        key: PREFIX_ITEM + d.getFullYear() + d.getMonth() + d.getDate(),
        date: d.toISOString()
      });
    });

    console.log('KEYS', keys);
    return keys;
  }

  reloadDBMonthItems(month: number, year: number) {
    const dbItems = this.getKeys(month, year);

    console.log('Getting Month Data');

    return new Promise((resolve) => {
      let items = [];

      dbItems.forEach((item) => {
        this.storage.get(item.key).then((i) => {
          items.push({
            key: item.key,
            allowances: i.allowances,
            expenses: i.expenses,
            savings: i.savings,
            date: i.date,
            note: i.note
          });
        })
          .catch(() => {
            console.log('No Item in Key. Replace with blank item.');
            items.push({
              key: item.key,
              allowances: [],
              expenses: [],
              savings: 0,
              date: item.date,
              note: ''
            });
          });
      });

      console.log('DATA DB ITEMS FOR MONTH: ', items);
      resolve(items);
    })
  }








  // #region ExpensesTemplate

  reloadTemplates() {
    return this.storage.get(TEMPLATE_KEY).then((templates) => {
      console.log('Get DB Templates');
      if (templates) {
        this.templates = templates;
      } else {
        console.log('No Template Item. Creating blank array (permanent).');
        this.storage.set(TEMPLATE_KEY, []);
      }
    });
  }

  addExpensesTemplate(ex: ExpensesTemplate) {
    this.templates.push(ex);
    console.log('Added New Template: ', ex);

    this.updateDBTemplates();
  }

  editExpensesTemplate(oldTemplate: ExpensesTemplate, newTemplate: ExpensesTemplate) {
    const index = this.templates.indexOf(oldTemplate);
    this.templates.splice(index, 1, newTemplate);

    this.updateDBTemplates();
  }

  removeExpensesTemplate(ex: ExpensesTemplate) {
    const index = this.templates.indexOf(ex);
    this.templates.splice(index, 1);

    this.updateDBTemplates();
  }

  getExpensesTemplates() {
    return this.templates;
  }

  updateDBTemplates() {
    return this.storage.set(TEMPLATE_KEY, this.templates)
      .then(() => {
        console.log('Update DB Template');
        this.reloadTemplates();
      });
  }

  //#endregion








  //#region THEME

  getDarkMode() {
    return this.storage.get(THEME_KEY);
  }

  setDarkMode(prefersDark: boolean) {
    return this.storage.set(THEME_KEY, prefersDark);
  }

  //#endregion












  // #region TUTORIAL

  getShowTutorial() {
    return this.storage.get(TUTORIAL_KEY);
  }

  setShowTutorial(show: boolean) {
    return this.storage.set(TUTORIAL_KEY, show);
  }

  //#endregion







  getTempItem(key) {
    return this.storage.get(key);
  }

  setTempItem(key, value) {
    return this.storage.set(key, value);
  }
  





  log() {
    console.log('Data Allowance: ', this.allowances);
    console.log('Data Expense: ', this.expenses);
  }
}
