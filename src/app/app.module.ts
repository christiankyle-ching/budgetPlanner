import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddExpensePage } from './pages/budget-today/add-expense/add-expense.page';
import { FormsModule } from '@angular/forms';
import { AddAllowancePage } from './pages/budget-today/add-allowance/add-allowance.page';
import { BudgetTodayMenuComponent } from './pages/budget-today/budget-today-menu/budget-today-menu.component';
import { AddExpensesTemplatePage } from './pages/budget-today/add-expenses-template/add-expenses-template.page';

import { IonicStorageModule } from '@ionic/storage';
import { SummaryDayPage } from './pages/summary/summary-day/summary-day.page';

//FORM VALIDATION
import { ReactiveFormsModule } from '@angular/forms';

//FILE - BACKUP
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx'
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


//MODALS
export const modals = [
  AddExpensePage,
  AddExpensesTemplatePage,
  AddAllowancePage,
  SummaryDayPage,
];

export const popoverMenus = [
  BudgetTodayMenuComponent
];

//INSERT DYNAMIC PAGES IN DECLARATIONS! AND ENTRYCOMPONENTS!
@NgModule({
  declarations: [AppComponent,
    ...modals,
    ...popoverMenus
  ],

  entryComponents: [

    ...modals,
    ...popoverMenus
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,    
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File, FileChooser, FileOpener, FilePath, Chooser,
    GoogleAnalytics,  
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
