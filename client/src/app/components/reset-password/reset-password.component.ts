import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  responseFromServer;
  result;
  token;
  constructor(private route: ActivatedRoute, private authService:AuthService) {
    this.route.params.subscribe( params => this.token = params.token );
}

  ngOnInit() {
  }

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

  resetPassword = function(){
    const requestUser = {
      password: this.passwordFormControl.value,
      confirmPassword: this.confirmPasswordFormControl.value,
      token: this.token,
    };

    this.authService.resetPassword(requestUser)
      .subscribe((res) => {
        console.log(res.msg);
      },
      error => {
        console.log(error.statusText);
      }
    );
  }

}
