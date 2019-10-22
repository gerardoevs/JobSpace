import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CatListPage } from './cat-list.page';

import { WorkerprofilePageModule } from '../modal-pages/workerprofile/workerprofile.module';
import { WorkerprofilePage } from '../modal-pages/workerprofile/workerprofile.page';

const routes: Routes = [
  {
    path: '',
    component: CatListPage
  }
];

@NgModule({
  entryComponents: [
    WorkerprofilePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    WorkerprofilePageModule
  ],
  declarations: [CatListPage]
})
export class CatListPageModule {}
