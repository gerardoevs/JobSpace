import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerprofilePage } from '../modal-pages/workerprofile/workerprofile.page';

import { Observable } from 'rxjs';
import { Worker, Distance } from '../interfaces/interfaces';
import { DistanceService } from '../services/distance-service.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.page.html',
  styleUrls: ['./cat-list.page.scss'],
})
export class CatListPage implements OnInit {
  category: string = null;
  workerList;
  location;
  userUID;

  constructor(
      private db: AngularFirestore,
      public modalController: ModalController,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private distanceServ: DistanceService,
      private afAuth: AngularFireAuth
    ) {

      this.activeRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.category = this.router.getCurrentNavigation().extras.state.cat;
          console.log(this.category);
        }
      });

      // this.db.collection('workerdata').snapshotChanges().subscribe( data => {
      // this.workerList = data.map(e => {
      //   return e.payload.doc.data();
      // });


      console.log(afAuth.auth.currentUser);
      this.userUID = afAuth.auth.currentUser.uid;

      this.db.collection('workerdata').snapshotChanges().subscribe( data => {
        this.workerList = data.map( e => {
          return e.payload.doc.data();
        });
        if (this.workerList != null){
          this.workerList = this.workerList.map((item: Worker) => {
            this.distanceServ.getDistance(item.location._lat + ',' + item.location._long)
            .subscribe((distance: Distance) => {
              const dist = distance.rows.map(row => {
                return row.elements.map(element => {
                  return element.distance;
                })
              });
              item.distance_text = dist[0][0].text;
              item.distance_away = dist[0][0].value;
              console.log(distance);
            });
            return item;
          });
          console.log(this.workerList);
          console.log(this.workerList.sort((a, b) => a.distance_away - b.distance_away));
        }
      });

      console.log(this.workerList);

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
    if ( workerCat === this.category) {
      return true;
    } else {
      return false;
    }
  }

}
