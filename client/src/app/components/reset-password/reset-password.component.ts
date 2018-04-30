import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  responseFromServer;
  result;
  token;
  constructor(private route: ActivatedRoute, private authService:AuthService, 
    private snackBar: MatSnackBar) {
    this.route.params.subscribe( params => this.token = params.token );
}

  ngOnInit() {
  }

  resetForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)
    ])
  }, this.passwordMatchValidator);

  passwordMatchValidator(g: FormGroup) {
    if (g.get('password').value === g.get('confirmPassword').value){
      g.get('confirmPassword').setErrors(null);
      return null;
    }
    else {
      g.get('confirmPassword').setErrors({MatchPassword: true});
      return {'MatchPassword': true}
    }
  }

  resetPassword = function(){
    if (this.resetForm.invalid){
      this.snackBar.open("Não foi possível recuperar a senha, favor tentar novamente.", 'Ok', {duration: 3000});
    }

    const requestUser = {
      password: this.resetForm.value.password,
      confirmPassword: this.resetForm.value.confirmPassword,
      token: this.token,
    };

    this.authService.resetPassword(requestUser)
      .subscribe((res) => {
        console.log(res.msg);
        this.snackBar.open("Senha recuperada com sucesso.", 'Ok', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Não foi possível recuperar a senha, favor tentar novamente.", 'Ok', {duration: 3000});
      }
    );
  }

}
