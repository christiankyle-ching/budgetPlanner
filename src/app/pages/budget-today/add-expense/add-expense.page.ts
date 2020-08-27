import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpensesTemplate } from '../../../models/expense.model';
import { DataService } from '../../../services/data.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NoWhiteSpaceValidator } from 'src/app/models/no-whitespace.validator';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {

  validatorPattern = '[a-zA-Z0-9 ]*';  

  useTemplate = false;
  selectedTemplate: ExpensesTemplate;
  templates: Array<ExpensesTemplate> = [];

  //#region FORM
  addExpenseForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, NoWhiteSpaceValidator.validInput, Validators.pattern(this.validatorPattern)]),
    amount: new FormControl([], [Validators.required, Validators.min(0)])
  });

  errorMessages = {
    'name': [
      {
        type: 'required',
        message: 'Name is required.'
      },
      {
        type: 'validInput',
        message: 'Cannot contain spaces only.'
      },
      {
        type: 'pattern',
        message: 'Only letters and spaces allowed.'
      }
    ],

    'amount': [
      {
        type: 'required',
        message: 'Amount cannot be blank.'
      },
      {
        type: 'min',
        message: 'Amount cannot be less than 0.'
      }
    ]
  }

  get name() {
    return this.addExpenseForm.get('name');
  }

  get amount() {
    return this.addExpenseForm.get('amount');
  }

  //#endregion


  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.templates = this.dataService.getExpensesTemplates();
  }

  dismiss(added: boolean, pName) {
    this.modalCtrl.dismiss({
      addedNewData: added,
      name: pName
    });
  }

  submitSingle() {
    const expense = {
      name: this.addExpenseForm.value.name,
      amount: this.addExpenseForm.value.amount
    }

    //show toast
    this.dismiss(true, expense.name);

    this.dataService.addExpense(expense);
  }

  submitTemplate() {
    this.dismiss (true, this.getNames());
    this.dataService.addExpenses(this.selectedTemplate.expenses);
  }

  getNames() {
    let str = '';

    if (this.useTemplate) {
      //str names for toast
      for (let i = 0; i < this.selectedTemplate.expenses.length; i++) {
        str += this.selectedTemplate.expenses[i].name;

        if (i < this.selectedTemplate.expenses.length - 1) {
          str += ', ';
        }
      }
    }

    str = str.trim();
    return str;

  }

}
