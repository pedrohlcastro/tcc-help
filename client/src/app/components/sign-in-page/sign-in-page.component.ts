import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppPage } from '../../../../e2e/app.po';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})

export class SignInPageComponent implements OnInit {
  responseFromServer;
  token;
  constructor(private route: ActivatedRoute, private authService:AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)
    ])
  });

  
  login = function(){
    if (this.loginForm.invalid){
      this.snackBar.open("Não foi possível efetuar o login, favor tentar novamente.", 'Ok', {duration: 3000});
      return;
    }

    const requestUser = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.loginUser(requestUser)
    .subscribe((res) => {
      console.log(res.msg);
      this.route.params.subscribe( params => this.token = res.token );
      this.snackBar.open("Login efetuado com sucesso.", 'Ok', {duration: 3000});
    },
    error => {
      console.log(error.statusText);
      this.snackBar.open("Não foi possível efetuar login, favor tentar novamente.", 'Ok', {duration: 3000});
    }
  );
  }
}
