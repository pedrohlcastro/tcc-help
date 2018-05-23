import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

import { TextPageDialogComponent } from '../text-page-dialog/text-page-dialog.component';

@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.scss'],
})
export class TextPageComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) { }
  
  ngOnInit() {

  }

  uploadFile(){
    let dialogRef = this.dialog.open(TextPageDialogComponent, {
      width: '40%'
    });
  }
}