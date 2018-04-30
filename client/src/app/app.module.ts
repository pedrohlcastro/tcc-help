import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserSignedInGuard } from './guards/user-signed-in-guard';

import { AppRoutingModule } from './app.module.routes';
import { AppMaterialModule } from './app.module.material';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { AuthService } from './services/auth.service';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { ManageRulesPageComponent } from './components/manage-rules-page/manage-rules-page.component';
import { RuleDialogComponent } from './components/rule-dialog/rule-dialog.component';

import { AccountPageComponent } from './components/account-page/account-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RuleService } from './services/rule.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    SignUpPageComponent,
    SignInPageComponent,
    ManageRulesPageComponent,
    RuleDialogComponent,
    AccountPageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  entryComponents: [
    RuleDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    RuleService,
    UserSignedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
