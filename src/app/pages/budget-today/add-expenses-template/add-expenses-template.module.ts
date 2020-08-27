import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExpensesTemplatePageRoutingModule } from './add-expenses-template-routing.module';

import { AddExpensesTemplatePage } from './add-expenses-template.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddExpensesTemplatePageRoutingModule,
  ],
  declarations: [AddExpensesTemplatePage]
})
export class AddExpensesTemplatePageModule {}
