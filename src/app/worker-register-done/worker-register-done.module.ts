import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkerRegisterDonePage } from './worker-register-done.page';

const routes: Routes = [
  {
    path: '',
    component: WorkerRegisterDonePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WorkerRegisterDonePage]
})
export class WorkerRegisterDonePageModule {}
