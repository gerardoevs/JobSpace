import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import {Worker, User} from '../../interfaces/interfaces';

@Component({
  selector: 'app-reg-worker',
  templateUrl: './reg-worker.page.html',
  styleUrls: ['./reg-worker.page.scss'],
})
export class RegWorkerPage implements OnInit {
  @Input() data: Worker;

  userData: User = {
    UID: '',
    names: '',
    lastnames: '',
    email: '',
    city: '',
    sex: '',
    regDate: '',
    telephone: '',
    type: '',
    img: ''
  };

  // For Employee Data
  newWorkerData = {
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    bio: '',
    habilities: [],
    location: null,
    pay: null,
    departamento: '',
    sexo: '',
    workdone: 0,
    category: '',
    password: '',
    cpassword: '',
    terminosycondiciones: false
  };

  workerHability;


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
    if ( this.workerHability !== '' ) {
      this.newWorkerData.habilities.push(this.workerHability);
      this.workerHability = '';
    }
   }



    onSubmitNewWorker() {
      if (this.newWorkerData.password !== this.newWorkerData.cpassword) {
        this.presentAlert(`Las contraseñas no coinciden.`);
        return;
      }
      if (!this.newWorkerData.terminosycondiciones) {
        this.presentAlert(`Para registrarte debes aceptar los terminos y condiciones.`);
        return;
      }

      this.geolocation.getCurrentPosition().then((resp) => {
        const location = { _lat: resp.coords.latitude, _long: resp.coords.longitude };
        this.newWorkerData.location = location;
      }).catch((error) => {
        console.log(error);
        this.presentAlert(`No se pudo obtener la ubicacion de tu dispositivo. Revisa que tengas la Ubicacion GPS Activa.`);
        return;
      });

      this.presentLoading();
      const uid = this.afAuth.auth.currentUser.uid;
      console.log(uid);
      this.db.collection('users').ref.where('UID', '==', uid).get().then( snapshot => {
        snapshot.forEach(doc => {
          this.userData.UID = doc.data().UID;
          this.userData.names = doc.data().names;
          this.userData.lastnames = doc.data().lastnames;
          this.userData.email = doc.data().email;
          this.userData.city = doc.data().city;
          this.userData.telephone = doc.data().telephone;
          this.userData.regDate = doc.data().regDate;
          this.userData.type = doc.data().type;
          this.userData.sex = doc.data().sex;
        });
      }).then(() => {

        console.log(this.userData);
        this.db.collection('workerdata').doc(this.userData.UID).set({
          UID: this.userData.UID,
          name: this.userData.names,
          lastname: this.userData.lastnames,
          email: this.userData.email,
          telephone: this.userData.telephone,
          city: this.userData.city,
          sex: this.userData.sex,
          workerRegDate: new Date(),
          tipo: 'common',
          workdone: 0,
          bio: this.newWorkerData.bio,
          habilities: this.newWorkerData.habilities,
          location: this.newWorkerData.location,
          category: this.newWorkerData.category,
          payment: this.newWorkerData.pay,
          userType: 'Employee'
        }).then(() => {
          this.dismissLoading();
          this.router.navigateByUrl('/worker-register-done');
        }).catch((err) => {
          console.log(err);
          this.dismissLoading();
          this.presentAlert(`Error ${err.code} message: ${err.message}`);
        }); // REG WORKER ON FIREBASE
      });


  } // onSubmitNewWorker()



}
