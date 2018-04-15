import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(50)
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(50)
  ]);

  register = function(){
    // check errors
    var hasError =  (this.usernameFormControl.errors ? false : true) &&
                    (this.emailFormControl.errors ? false : true)  && 
                    (this.passwordFormControl.errors ? false : true) &&
                    (this.confirmPasswordFormControl.errors ? false : true);

    if (hasError){
      // 
      console.log("estou tentando cadastrar");
    }
  }

}