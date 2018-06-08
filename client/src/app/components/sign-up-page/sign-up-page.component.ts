import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    userType: new FormControl('1', [
      Validators.required,
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
 
  register(){
    if (this.registerForm.invalid){
      this.snackBar.open("Não foi possível efetuar cadastro, favor tentar novamente.", 'Fechar', {duration: 3000});
      return;
    }
    const requestUser = {
      name: this.registerForm.get('username').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      type: this.registerForm.get('userType').value,
      validate_professor: 0,
      profile_image_path: 'path',
    };
    this.authService.createUser(requestUser)
      .subscribe((res) => {
        console.log(res.msg);
        this.snackBar.open("Usuário cadastrado com sucesso.", 'Fechar', {duration: 3000});
        this.router.navigateByUrl('/sign-in');
      },
      error => {
        console.log(error.statusText);
        if (error._body.includes("already exists"))
          this.snackBar.open("O e-mail já existe, favor inserir um diferente.", 'Fechar', {duration: 3000});
        else
          this.snackBar.open("Não foi possível efetuar cadastro, favor tentar novamente.", 'Fechar', {duration: 3000});
      });
  }

}