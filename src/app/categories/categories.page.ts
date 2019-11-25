import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  nombreUsuario;

  constructor(
      public fireAuth: AngularFireAuth,
      private router: Router
    ) {

  }

  ngOnInit() {
    console.log(this.fireAuth.auth.currentUser.uid);
  }

  goToCategory(pg: string, category: string) {  // Nav to category list employee, with extras method to send params
    const navigationExtras: NavigationExtras = {
      state: {
        cat: category
      }
    };
    this.router.navigate([pg], navigationExtras);

  }

}
