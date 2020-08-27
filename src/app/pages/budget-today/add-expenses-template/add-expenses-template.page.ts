import { Component, OnInit } from '@angular/core';
import { ExpensesTemplate, Expense } from '../../../models/expense.model';
import { DataService } from '../../../services/data.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-expenses-template',
  templateUrl: './add-expenses-template.page.html',
  styleUrls: ['./add-expenses-template.page.scss'],
})
export class AddExpensesTemplatePage implements OnInit {

  selectedTemplate: any = 'new';
  templates: Array<ExpensesTemplate> = [];
  tmpExpenses: Array<Expense> = [];

  txtTemplateName: string = '';
  txtName: string = '';
  txtAmount: number = null;
  isCreatingNewTemplate: boolean = true;

  alertNameVisible = false;
  alertItemsVisible = false;
  canAdd = false;
  canProceed = false;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.templates = this.dataService.getExpensesTemplates();
  }

  addExpense() {
    this.tmpExpenses.push({
      name: this.txtName,
      amount: this.txtAmount
    });

    this.clearInputs();
    this.validateData();
  }

  removeExpense(ex: Expense) {
    const index = this.tmpExpenses.indexOf(ex);
    this.tmpExpenses.splice(index, 1);

    this.validateData();
  }

  removeExpensesTemplate() {
    this.dataService.removeExpensesTemplate(this.selectedTemplate);

    this.dismiss('delete', this.selectedTemplate.name);
  }

  selectedTemplateChanged() {
    if (this.selectedTemplate == 'new') {
      this.isCreatingNewTemplate = true;
      this.txtTemplateName = '';
      this.tmpExpenses = [];
      this.clearInputs();
    } else {
      this.isCreatingNewTemplate = false;
      this.txtTemplateName = this.selectedTemplate['name'];
      this.tmpExpenses = this.selectedTemplate['expenses'];
    }
  }

  clearInputs() {
    this.txtName = '';
    this.txtAmount = null;
  }

  save() {
    this.dataService.addExpensesTemplate({
      name: this.txtTemplateName,
      expenses: this.tmpExpenses
    });

    this.dismiss('save', this.txtTemplateName);
  }

  edit() {
    this.dataService.editExpensesTemplate(this.selectedTemplate, {
      name: this.txtTemplateName,
      expenses: this.tmpExpenses
    });

    this.dismiss('edit', this.selectedTemplate.name);
  }

  dismiss(pAction: string, pName: string) {
    this.modalCtrl.dismiss({
      action: pAction,
      name: pName
    });
  }

  async confirmRemoveTemplate(template: ExpensesTemplate) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Action',
      message: `Delete <strong>Template: ${this.selectedTemplate.name}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            this.removeExpensesTemplate();
          }
        }
      ]
    });

    await alert.present();
  }

  validateTemplateName() {
    console.log('Regex: ', !(RegExp('[a-zA-Z0-9 ]*').test(this.txtTemplateName)));
    
    this.alertNameVisible = (this.txtTemplateName.trim() == ''); 

    return !this.alertNameVisible;
  }

  validateItems() {
    this.alertItemsVisible = (this.tmpExpenses.length <= 0);

    return !this.alertItemsVisible;
  }

  validateData() {
    const valid1 = this.validateTemplateName();
    const valid2 = this.validateItems();

    this.canProceed = (valid1 && valid2) ? true : false;
    
    const nameHasError = (this.txtName == null || this.txtName.trim() == '');
    const amountHasError = (this.txtAmount == null || this.txtAmount < 0);

    this.canAdd = (nameHasError || amountHasError) ? false : true ;
  }

}

