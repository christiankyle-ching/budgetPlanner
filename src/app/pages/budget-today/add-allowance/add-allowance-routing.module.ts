import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAllowancePage } from './add-allowance.page';

const routes: Routes = [
  {
    path: '',
    component: AddAllowancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAllowancePageRoutingModule {}
