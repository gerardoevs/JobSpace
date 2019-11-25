import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { Geolocation } from '@ionic-native/geolocation/ngx';
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
// For Employee Data
  newWorkerData = {
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    bio: '',
    habilities: [],
    geoPos: [],
    pay: 0.00,
    departamento: '',
    sexo: '',
    category: '',
    password: '',
    cpassword: '',
    terminosycondiciones: false
  };
  isEmployer: boolean = true;

  constructor(
    private geolocation: Geolocation,
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
        UID: cred.user.uid,
        nombres: this.newUserData.nombres,
        apellidos: this.newUserData.apellidos,
        email: this.newUserData.email,
        telefono: this.newUserData.telefono,
        departamento: this.newUserData.departamento,
        sexo: this.newUserData.sexo,
        fecharegistro: new Date(),
        tipo: 'common',
        userType: 'Employer'
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

  switchRegMode() {
    this.isEmployer = !this.isEmployer;
    if (this.isEmployer) {
     document.getElementById('EmployeeForm').hidden = true;
     document.getElementById('EmployerForm').hidden = false;
    } else {
      document.getElementById('EmployerForm').hidden = true;
      document.getElementById('EmployeeForm').hidden = false;
    }
  }

  // For Worker Form

  addHability(){
    const hability: string = document.getElementById('newHability').value;
    if( hability != '' ) {
      this.newWorkerData.habilities.push(hability);
      document.getElementById('newHability').value = '';
    }

  }


    onSubmitNewWorker() {
      let geoPos = null;
      if (this.newWorkerData.password !== this.newWorkerData.cpassword) {
        this.presentAlert(`Las contraseñas no coinciden.`);
        return;
      }
      if (!this.newWorkerData.terminosycondiciones) {
        this.presentAlert(`Para registrarte debes aceptar los terminos y condiciones.`);
        return;
      }

      this.geolocation.getCurrentPosition().then((resp) => {
        geoPos = { _lat: resp.coords.latitude, _long: resp.coords.longitude };
        this.newWorkerData.geoPos = geoPos;
      }).catch((error) => {
        this.presentAlert(`No se pudo obtener la ubicacion de tu dispositivo. Revisa que tengas la Ubicacion GPS Activa.`);
        return;
      });



      this.presentLoading();
      this.afAuth.auth.createUserWithEmailAndPassword(this.newWorkerData.email, this.newWorkerData.password).then(cred => {
        cred.user.sendEmailVerification();
        return this.db.collection('workerdata').doc(cred.user.uid).set({
          UID: cred.user.uid,
          name: this.newWorkerData.nombres,
          lastname: this.newWorkerData.apellidos,
          email: this.newWorkerData.email,
          telefono: this.newWorkerData.telefono,
          departamento: this.newWorkerData.departamento,
          sexo: this.newWorkerData.sexo,
          fecharegistro: new Date(),
          tipo: 'common',
          bio: this.newWorkerData.bio,
          habilities: this.newWorkerData.habilities,
          geoPos: this.newWorkerData.geoPos,
          category: this.newWorkerData.category,
          payment: this.newWorkerData.pay,
          userType: 'Employee'
        });
      }).then(() => {
        this.dismissLoading();
        this.router.navigateByUrl('/verify-email');
      }).catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          this.dismissLoading();
          this.presentAlert(`El correo ${this.newWorkerData.email} ya esta siendo utilizado.`);
        }
      });

  } // onSubmitNewWorker()


}
