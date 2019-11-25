import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerprofilePage } from './workerprofile.page';
//import { GoogleMapsComponent } from '../../components/google-maps/google-maps.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ], 
  declarations: [WorkerprofilePage ] //, GoogleMapsComponent]
})
export class WorkerprofilePageModule {}
