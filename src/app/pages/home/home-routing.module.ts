import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/budget-today',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'budget-today',
        loadChildren: () => import('../budget-today/budget-today/budget-today.module').then(m => m.BudgetTodayPageModule)
      },
      {
        path: 'summary',
        loadChildren: () => import('../summary/summary.module').then(m => m.SummaryPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('../help/help.module').then(m => m.HelpPageModule)
      },
      {
        path: 'backup',
        loadChildren: () => import('../backup/backup.module').then( m => m.BackupPageModule)
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
