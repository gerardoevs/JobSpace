import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page';

import { RegWorkerPageModule } from '../modal-pages/reg-worker/reg-worker.module';
import { RegWorkerPage } from '../modal-pages/reg-worker/reg-worker.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }
];

@NgModule({
  entryComponents: [
    RegWorkerPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RegWorkerPageModule
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
