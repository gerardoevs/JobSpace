import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newUserData = {
    names: '',
    lastnames: '',
    email: '',
    telephone: '',
    city: '',
    sex: '',
    password: '',
    cpassword: '',
    terms: false
  };

  private error;


  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitNewUser() {

    if (this.newUserData.password !== this.newUserData.cpassword) {
      this.presentAlert(`Las contraseñas no coinciden.`);
      return;
    }
    if (!this.newUserData.terms) {
      this.presentAlert(`Para registrarte debes aceptar los terminos y condiciones.`);
      return;
    }
    this.presentLoading().then(() => {
      this.afAuth.auth.createUserWithEmailAndPassword(this.newUserData.email, this.newUserData.password).then(cred => {
        cred.user.sendEmailVerification();
        return this.db.collection('users').doc(cred.user.uid).set({
          UID: cred.user.uid,
          names: this.newUserData.names,
          lastnames: this.newUserData.lastnames,
          email: this.newUserData.email,
          telephone: this.newUserData.telephone,
          city: this.newUserData.city,
          sex: this.newUserData.sex,
          regDate: new Date(),
          type: 'common'
        });
      }).then(() => {
        this.dismissLoading();
        this.router.navigateByUrl('/verify-email');
      }).catch((err) => {
        this.dismissLoading();
        console.log(err);
        if (err.code === 'auth/invalid-email') {
          this.presentAlert(`El correo es invalido.`);
        }
        if (err.code === 'auth/email-already-in-use') {
          this.presentAlert(`El correo ${this.newUserData.email} ya esta siendo utilizado.`);
        }
        if (err.code === 'auth/weak-password') {
          this.presentAlert(`La contraseña es muy debil, intenta con otra.`);
        }
      });
    });


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
