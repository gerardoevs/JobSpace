import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'verify-email', loadChildren: './verify-email/verify-email.module#VerifyEmailPageModule' },
  { path: 'not-verified', loadChildren: './not-verified/not-verified.module#NotVerifiedPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule' },
  { path: 'near-me', loadChildren: './near-me/near-me.module#NearMePageModule' },
  { path: 'cat-list', loadChildren: './cat-list/cat-list.module#CatListPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
