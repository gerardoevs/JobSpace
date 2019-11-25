import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import {Worker} from '../../interfaces/interfaces';

@Component({
  selector: 'app-reg-worker',
  templateUrl: './reg-worker.page.html',
  styleUrls: ['./reg-worker.page.scss'],
})
export class RegWorkerPage implements OnInit {
  @Input() data: Worker;

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
    workdone: 0,
    category: '',
    password: '',
    cpassword: '',
    terminosycondiciones: false
  };


  constructor(
    private geolocation: Geolocation,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    public modalController: ModalController
  ) { }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  ngOnInit() {
  }

   // For Worker Form

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


   addHability() {
    const hability: string = document.getElementById('newHability').value;
    if ( hability != '' ) {
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
          workdone: this.newWorkerData.workdone,
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
