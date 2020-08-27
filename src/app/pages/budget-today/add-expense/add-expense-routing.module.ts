import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExpensePage } from './add-expense.page';

const routes: Routes = [
  {
    path: '',
    component: AddExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExpensePageRoutingModule {}
