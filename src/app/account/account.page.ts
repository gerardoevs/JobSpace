import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegWorkerPage } from '../modal-pages/reg-worker/reg-worker.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {

  userData = {
    UID: '',
    img: ''
  };

  constructor(
    public fireAuth: AngularFireAuth,
    public alertController: AlertController,
    public modalController: ModalController,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {

      const uid = this.afAuth.auth.currentUser.uid;
      this.db.collection('users').ref.where('UID', '==', uid).get().then( snapshot => {
        snapshot.forEach(doc => {
          this.userData.UID = doc.data().UID;
          this.userData.img = doc.data().img;
          console.log(doc.data().img)
        });
      });
    }

  ngOnInit() {
  }

  async logout() {
    this.presentLoading();
    try {
      await this.fireAuth.auth.signOut().then(() => {
        this.dismissLoading();
      }).then(() => {
        this.router.navigateByUrl('/login');
      });
    } catch (error) {
      this.dismissLoading();
      this.presentAlert('No se pudo desloguearse');
      console.dir(error);
    }
  }

  async presentWorkerModalReg() {
    const modal = await this.modalController.create({
      component: RegWorkerPage
    });
    return await modal.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }

}
