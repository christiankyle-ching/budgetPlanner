import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllowancePageRoutingModule } from './allowance-routing.module';

import { AllowancePage } from './allowance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllowancePageRoutingModule
  ],
  declarations: [AllowancePage]
})
export class AllowancePageModule {}
