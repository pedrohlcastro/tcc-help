import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  user;
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.authService.getUserFromToken()
      .subscribe((res) => {
        this.user = res;
        this.accountForm.patchValue({
          username: res.name,
          email: res.email,
          userType: res.type
        });
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Ok', {duration: 3000});
      }
    );
  }
  
  accountForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl({value: '', disabled: true},[
      Validators.required,
      Validators.email
    ]),
    userType: new FormControl('', [
      Validators.required,
    ]),
    oldPassword: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)
    ]),
    password: new FormControl('',[
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
  save() {
    if (this.accountForm.invalid){
      this.snackBar.open("Não foi possível salvar os dados, favor tentar novamente.", 'Ok', {duration: 3000});
      return;
    }
    const requestUser = {
      id: 2,
      name: this.accountForm.value.username,
      email: this.accountForm.value.email,
      password: this.accountForm.value.password,
      type: this.accountForm.value.userType
    };
    
    this.authService.updateUser(requestUser)
      .subscribe((res) => {
        console.log(res.msg);
        this.snackBar.open("Dados salvos com sucesso.", 'Ok', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Não foi possível salvar os dadso, favor tentar novamente.", 'Ok', {duration: 3000});
      }
    );
  }
}
