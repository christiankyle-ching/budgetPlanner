import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAllowancePageRoutingModule } from './add-allowance-routing.module';

import { AddAllowancePage } from './add-allowance.page';

//FORM VALIDATION
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAllowancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddAllowancePage]
})
export class AddAllowancePageModule {}
