import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import { AppPage } from '../../../../e2e/app.po';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})

export class SignInPageComponent implements OnInit {
  responseFromServer;
  result;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.dumpExample()
      .subscribe((res) => {
        this.responseFromServer = res.status
      });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(50)
  ]);


  login = function(){
    // check errors
    var hasError = (this.emailFormControl.errors ? false : true) && 
                    (this.passwordFormControl.errors ? false : true);

    //if (hasError){
      const requestUser = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      };
      this.authService.loginUser(requestUser);
      
    //}
  }
}
