import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  responseFromServer;
  result;

  constructor(private authService:AuthService) { }

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
      },
      error => {
        console.log(error.statusText);
      }
    );
  }

}
