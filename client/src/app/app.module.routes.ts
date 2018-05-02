import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ManageRulesPageComponent } from './components/manage-rules-page/manage-rules-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserSignedInGuard } from './guards/user-signed-in-guard';
import { HelpPageComponent } from './components/help-page/help-page.component';

const ROUTES: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'sign-in', component: SignInPageComponent},
    { path: 'sign-up', component: SignUpPageComponent},
    { path: 'manage-rules', component: ManageRulesPageComponent, canActivate: [UserSignedInGuard]},
    { path: 'account-page', component: AccountPageComponent, canActivate: [UserSignedInGuard]},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'reset-password/:token', component: ResetPasswordComponent},
    { path: 'help-page', component: HelpPageComponent, canActivate: [UserSignedInGuard]}
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