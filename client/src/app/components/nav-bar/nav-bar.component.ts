import { Component, OnInit } from '@angular/core';

declare const $;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navBarOpen = false;
  constructor() { }

  ngOnInit() {
    this.closeNavBar();
  }

  changeNavBar(param){
    this.navBarOpen = param;
    if(param) {
      this.openNavBar();
    } else {
      this.closeNavBar();
    }
  }

  openNavBar(){
    $('.nav-bar').width( '300px' );
    $('#content').css({'margin-left' : '300px'});
  }

  closeNavBar(){
    $('.nav-bar').width( '0px' );
    $('#content').css({'margin-left' : '0px'});
  }
}
