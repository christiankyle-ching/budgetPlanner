import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryPage } from './summary.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryPage
  },
  {
    path: 'summary-day',
    loadChildren: () => import('./summary-day/summary-day.module').then( m => m.SummaryDayPageModule)
  },
  {
    path: 'allowance',
    loadChildren: () => import('./allowance/allowance.module').then( m => m.AllowancePageModule)
  },
  {
    path: 'expenses',
    loadChildren: () => import('./expenses/expenses.module').then( m => m.ExpensesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryPageRoutingModule {}
