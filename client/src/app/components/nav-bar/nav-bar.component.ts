import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

declare const $;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navBarOpen = false;
  isAuthenticated: boolean;
  isProfessor: boolean;
  isAdmin : boolean;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    // subscription when user is logged
    this.authService.loggedIn.subscribe(status => this.isAuthenticated = status);
    this.authService.adminLoggedIn.subscribe(status => this.isAdmin = status);
    this.authService.professorLoggedIn.subscribe(status => this.isProfessor = status);
  }

  ngOnInit() {
    this.closeNavBar();
  }
  signOut(){
    this.authService.logout();
    this.snackBar.open("Usuário desconectado com sucesso.", 'Fechar', {duration: 5000});
    this.router.navigateByUrl('/');
  }
  
  changeNavBar(param){
    this.navBarOpen = param;
    if(param) {
      this.openNavBar();
    } else {
      this.closeNavBar();
    }
  }

  openNavBar(){
    $('.nav-bar').width( '300px' );
    $('#content').css({'margin-left' : '300px'});
    $('.top-header').css({'display' : 'none'});
  }

  closeNavBar(){
    $('.nav-bar').width( '0px' );
    $('#content').css({'margin-left' : '0px'});
    $('.top-header').css({'display' : 'block'});
  }
}
