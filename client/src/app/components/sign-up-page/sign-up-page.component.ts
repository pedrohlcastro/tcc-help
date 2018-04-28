import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

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
    userType: new FormControl('', [
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
 
  register = function(){
    if (this.registerForm.invalid){
      this.snackBar.open("Não foi possível efetuar cadastro, favor tentar novamente.", 'Ok', {duration: 3000});
      return;
    }
    const requestUser = {
      name: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      type: this.registerForm.value.userType,
      validate_professor: 0,
      profile_image_path: 'path',
    };
    
    this.authService.createUser(requestUser)
      .subscribe((res) => {
        console.log(res.msg);
        this.snackBar.open("Usuário cadastrado com sucesso.", 'Ok', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Não foi possível efetuar cadastro, favor tentar novamente.", 'Ok', {duration: 3000});
      }
    );
  }

}