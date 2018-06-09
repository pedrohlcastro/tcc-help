import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MatSnackBar } from '@angular/material';


import { AuthService } from './../services/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class AdminSignedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService:AuthService,
    private snackBar:MatSnackBar
  ){ }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    return this.authService.checkToken().map((res) => {
      if (res.result == 'Success' && res.type === 0) return true;
      else {
        this.snackBar.open("Você deve ser Admin para acessar aqui...", 'Fechar', {duration: 5000});
        this.router.navigateByUrl('/account-page');
        return of(false);
      }
    }) //catch the first Observable
    .catch((e) => {
      this.snackBar.open("Você deve ser Admin para acessar aqui...", 'Fechar', {duration: 5000});
      this.router.navigateByUrl('/account-page');
      return of(false);
    });
  }
}