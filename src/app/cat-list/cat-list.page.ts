import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { WorkerprofilePage } from '../modal-pages/workerprofile/workerprofile.page';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.page.html',
  styleUrls: ['./cat-list.page.scss'],
})
export class CatListPage implements OnInit {

  workerList;

  constructor(
      private db: AngularFirestore,
      public modalController: ModalController
    ) {
    this.db.collection('workerdata').snapshotChanges().subscribe( data => {
      this.workerList = data.map(e => {
        return e.payload.doc.data();
      });
      console.log(this.workerList);
    });

  }

  ngOnInit() {
  }

  async presentModal(workerData) {
    const modal = await this.modalController.create({
      component: WorkerprofilePage,
      componentProps : {
        data: workerData
      }
    });
    return await modal.present();
  }

}
