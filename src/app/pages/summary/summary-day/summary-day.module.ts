import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryDayPageRoutingModule } from './summary-day-routing.module';

import { SummaryDayPage } from './summary-day.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryDayPageRoutingModule
  ],
  declarations: [SummaryDayPage]
})
export class SummaryDayPageModule {}
