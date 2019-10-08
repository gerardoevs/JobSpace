import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { resolve } from 'path';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.page.html',
  styleUrls: ['./cat-list.page.scss'],
})
export class CatListPage implements OnInit {

  workerList;

  constructor(private db: AngularFirestore) {
    this.db.collection('workerdata').snapshotChanges().subscribe( data => {
      this.workerList = data.map(e => {
        return e.payload.doc.data();
      });
      console.log(this.workerList);
    });
    
  }

  ngOnInit() {
    
  }

}
