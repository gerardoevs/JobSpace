import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Worker} from '../../interfaces/interfaces';
import { from } from 'rxjs';

@Component({
  selector: 'app-workerprofile',
  templateUrl: './workerprofile.page.html',
  styleUrls: ['./workerprofile.page.scss'],
})
export class WorkerprofilePage implements OnInit {

  @Input() data: Worker;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.data.habilities);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
