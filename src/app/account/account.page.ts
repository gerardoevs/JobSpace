import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public fireAuth: AngularFireAuth,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router) { }

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
