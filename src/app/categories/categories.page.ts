import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  nombreUsuario;

  constructor(public fireAuth: AngularFireAuth) {

  }

  ngOnInit() {
    console.log(this.fireAuth.auth.currentUser.uid);
  }

}
