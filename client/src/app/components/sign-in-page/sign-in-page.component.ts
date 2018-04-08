import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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



}
