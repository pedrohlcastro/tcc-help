import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})

export class SignInPageComponent implements OnInit {
  responseFromServer;
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
    var hasError = (this.emailFormControl.errors ? true : false) && 
                    (this.passwordFormControl.errors ? true : false);

    if (hasError){
      // 
      console.log("estou tentando logar");
    }
  }

}
