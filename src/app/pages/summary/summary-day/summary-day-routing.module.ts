import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryDayPage } from './summary-day.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryDayPageRoutingModule {}
