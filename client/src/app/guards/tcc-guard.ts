import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MatSnackBar } from '@angular/material';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { TccService } from '../services/tcc.service';

@Injectable()
export class TccGuard implements CanActivate {
  constructor(
    private router: Router,
    private tccService:TccService,
    private snackBar:MatSnackBar,
    private route: ActivatedRoute,
  ){ }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    console.log(next);
    return this.tccService.getAccessRights(1).map((res) => {
        if (res.result == 'Success') return true; // Can access the route
    }) //catch the first Observable
    .catch((e) => {
        this.snackBar.open("Você não pode acessar essa pagina", 'Fechar', {duration: 5000});
        this.router.navigateByUrl('/');
        return of(false);
    });        
    
  }
}