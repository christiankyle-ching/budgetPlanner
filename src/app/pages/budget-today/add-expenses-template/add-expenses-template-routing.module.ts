import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExpensesTemplatePage } from './add-expenses-template.page';

const routes: Routes = [
  {
    path: '',
    component: AddExpensesTemplatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExpensesTemplatePageRoutingModule {}
