import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories'
  },
  {
    path: '',
    component: TabsPage,
    children : [
      {
        path: 'categories',
        loadChildren : '../categories/categories.module#CategoriesPageModule'
      },
      {
        path: 'near-me',
        loadChildren : '../near-me/near-me.module#NearMePageModule'
      },
      {
        path: 'account',
        loadChildren : '../account/account.module#AccountPageModule'
      },
      {
        path: 'cat-list',
        loadChildren : '../cat-list/cat-list.module#CatListPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
