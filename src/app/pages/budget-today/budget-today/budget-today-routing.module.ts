import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetTodayPage } from './budget-today.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetTodayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetTodayPageRoutingModule {}
