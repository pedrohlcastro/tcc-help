import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  responseFromServer;
  result;

  constructor(private authService:AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  forgotPassword = function(){
    const userEmail = {
      email: this.emailFormControl.value
    };

    this.authService.forgotPassword(userEmail)
      .subscribe((res) => {
        console.log(res.msg);
        this.snackBar.open("O link de recuperação foi enviado para seu e-mail.", 'Ok', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Ok', {duration: 3000});
      }
    );
  }

}
