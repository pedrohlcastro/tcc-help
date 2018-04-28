import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const ROUTES: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'sign-in', component: SignInPageComponent},
    { path: 'sign-up', component: SignUpPageComponent},
    { path: 'account-page', component: AccountPageComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'reset-password/:token', component: ResetPasswordComponent}
  ];
  
@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}