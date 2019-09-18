import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(
    public fireAuth: AngularFireAuth,
    public alertController: AlertController,
    private loadingController: LoadingController
    ) { }

  ngOnInit() {
  }

  async login() {
    this.presentLoading();
    const { email, password } = this;
    try {
      const res = await this.fireAuth.auth.signInWithEmailAndPassword(email, password);
      if (!res.user.emailVerified) {
        console.log('Usuario no verificado');
        this.dismissLoading();
        return;
      } else {
        console.log('Bienvenido!');
        this.dismissLoading();
      }
    } catch (error) {
      this.dismissLoading();
      if (error.code === 'auth/user-not-found'){
        this.presentAlert('Usuario no registrado');
      }
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
