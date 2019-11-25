import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerprofilePage } from '../modal-pages/workerprofile/workerprofile.page';

import { Observable } from 'rxjs';
import { worker } from 'cluster';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.page.html',
  styleUrls: ['./cat-list.page.scss'],
})
export class CatListPage implements OnInit {
  category: string = null;
  workerList;

  constructor(
      private db: AngularFirestore,
      public modalController: ModalController,
      private activeRoute: ActivatedRoute,
      private router: Router
    ) {

      this.activeRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.category = this.router.getCurrentNavigation().extras.state.cat;
          console.log(this.category);
        }
      });

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

  comprobeCat(workerCat: string) {
    if ( workerCat == this.category) {
      return true;
    } else {
      return false;
    }
  }

}
