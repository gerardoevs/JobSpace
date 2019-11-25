import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ModalController } from '@ionic/angular';
import { RegWorkerPage } from '../modal-pages/reg-worker/reg-worker.page';
=======
import { AngularFireAuth } from '@angular/fire/auth';

import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
>>>>>>> 90dbdbb81ec15d2498b6a28c9e4539b1ea0ea91e

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {

<<<<<<< HEAD
  constructor(public modalController: ModalController) { }
=======
  constructor(
    public fireAuth: AngularFireAuth,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router) { }
>>>>>>> 90dbdbb81ec15d2498b6a28c9e4539b1ea0ea91e

  ngOnInit() {
  }

<<<<<<< HEAD
  async presentRegWorkerModal() {
    const modal = await this.modalController.create({
      component: RegWorkerPage,
      componentProps : {  // El problema mas o menos aqui,....
        data: ''
      }
    });
    return await modal.present();
=======
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
>>>>>>> 90dbdbb81ec15d2498b6a28c9e4539b1ea0ea91e
  }

}
