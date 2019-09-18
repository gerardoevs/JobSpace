import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


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
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    departamento: '',
    sexo: '',
    password: '',
    cpassword: '',
    terminosycondiciones: false
  };

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
    if (!this.newUserData.terminosycondiciones) {
      this.presentAlert(`Para registrarte debes aceptar los terminos y condiciones.`);
      return;
    }
    this.presentLoading();
    this.afAuth.auth.createUserWithEmailAndPassword(this.newUserData.email, this.newUserData.password).then(cred => {
      cred.user.sendEmailVerification();
      return this.db.collection('users').doc(cred.user.uid).set({
        nombres: this.newUserData.nombres,
        apellidos: this.newUserData.apellidos,
        email: this.newUserData.email,
        telefono: this.newUserData.telefono,
        departamento: this.newUserData.departamento,
        sexo: this.newUserData.sexo,
        fecharegistro: new Date(),
        tipo: 'common',
      });
    }).then(() => {
      this.dismissLoading();
      this.router.navigateByUrl('/verify-email');
    }).catch((err) => {
      if (err.code === 'auth/email-already-in-use') {
        this.dismissLoading();
        this.presentAlert(`El correo ${this.newUserData.email} ya esta siendo utilizado.`);
      }
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
