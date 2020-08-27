import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetTodayPageRoutingModule } from './budget-today-routing.module';

import { BudgetTodayPage } from './budget-today.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetTodayPageRoutingModule
  ],
  declarations: [BudgetTodayPage]
})
export class BudgetTodayPageModule {}
