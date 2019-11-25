import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegWorkerPage } from '../modal-pages/reg-worker/reg-worker.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async presentRegWorkerModal() {
    const modal = await this.modalController.create({
      component: RegWorkerPage,
      componentProps : {  // El problema mas o menos aqui,....
        data: ''
      }
    });
    return await modal.present();
  }

}
