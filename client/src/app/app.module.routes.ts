import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const ROUTES: Routes = [
    { path: '', component: HomePageComponent },
    { path: '/sign-in', component: SignInPageComponent},
    { path: '/sign-up', component: SignUpPageComponent}
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