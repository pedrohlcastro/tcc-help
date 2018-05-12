import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  user;
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
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
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
      }
    );
    console.log(this.user);
  }
  
  accountForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl({value: '', disabled: true},[
    ]),
    userType: new FormControl('', [
      Validators.required
    ]),
    passwords: new FormGroup({
      password: new FormControl('',[
        Validators.minLength(6),
        Validators.maxLength(50)
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(50)
      ])
    }, this.passwordMatchValidator)
  });

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
      this.snackBar.open("Não foi possível salvar os dados, favor tentar novamente.", 'Fechar', {duration: 3000});
      return;
    }
    const requestUser = {
      id: this.user.id,
      name: this.accountForm.get('username').value,
      email: this.accountForm.get('email').value,
      password: this.accountForm.get('passwords').get('password').value,
      confirmPassword: this.accountForm.get('passwords').get('confirmPassword').value,
      type: this.accountForm.get('userType').value
    };
    
    this.authService.updateUser(requestUser)
      .subscribe((res) => {
        console.log(res.msg);
        this.snackBar.open("Dados salvos com sucesso.", 'Fechar', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Não foi possível salvar os dados, favor tentar novamente.", 'Fechar', {duration: 3000});
      }
    );
  }

  visitStudents(){
    this.router.navigate(['/students-list']);
  }
}
