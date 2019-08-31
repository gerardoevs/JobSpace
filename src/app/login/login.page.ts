import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    public fireAuth: AngularFireAuth,
    public alertController: AlertController
    ) { }

  ngOnInit() {
  }

  async login() {
    const { email, password } = this;
    try {
      const res = await this.fireAuth.auth.signInWithEmailAndPassword(email, password);
      console.log(res);
    } catch (error) {
      if(error.code === 'auth/user-not-found'){
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

}
