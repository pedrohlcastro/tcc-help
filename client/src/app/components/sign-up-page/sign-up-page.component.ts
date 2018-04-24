import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.userTypeFormControl.value = "1";
   }

  ngOnInit() {
  }

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  userTypeFormControl = new FormControl('', [
    Validators.required,
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

    //if (hasError){
      const requestUser = {
        name: this.usernameFormControl.value,
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
        type: this.userTypeFormControl.value,
        validate_professor: 0,
        profile_image_path: 'path',
      };
      this.authService.createUser(requestUser)
        .subscribe((res) => {
          console.log(res.msg);
        },
        error => {
          console.log(error.statusText);
        }
      );
    }
  //}

}