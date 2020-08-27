import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllowancePage } from './allowance.page';

const routes: Routes = [
  {
    path: '',
    component: AllowancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllowancePageRoutingModule {}
