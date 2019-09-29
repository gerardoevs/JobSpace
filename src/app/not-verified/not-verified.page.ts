import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

import { LoadingController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-verified',
  templateUrl: './not-verified.page.html',
  styleUrls: ['./not-verified.page.scss'],
})
export class NotVerifiedPage implements OnInit {
  constructor(
    public fireAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.fireAuth.authState.pipe(first()).toPromise();
  }

  async resendVerifyEmail() {
    const user = await this.isLoggedIn();
    if (user) {
      this.presentLoading().then(() => {
        user.sendEmailVerification();
      }).then(() => {
          this.presentAlert('Email de verificación enviado!');
        }
      ).then(() => {
        this.router.navigateByUrl('/login');
        this.dismissLoading();
        }
      );
    } else {
      console.log('No hay usuario para el singout');
    }
  }

  async logout() {
    const user = await this.isLoggedIn();
    if (user) {
      this.fireAuth.auth.signOut().then(() => {
        this.presentLoading().then(() => {
          this.router.navigateByUrl('/login');
          this.dismissLoading();
        });
      });
    } else {
      console.log('No hay usuario para el singout');
    }
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

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}
