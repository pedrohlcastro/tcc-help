import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

import { ManageRulesPageComponent } from '../manage-rules-page/manage-rules-page.component';

@Component({
  selector: 'app-forum-dialog',
  templateUrl: './forum-dialog.component.html',
  styleUrls: ['./forum-dialog.component.scss']
})
export class ForumDialogComponent implements OnInit {

  constructor(
    private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<ManageRulesPageComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) {  }

  topic = {
    title: '',
    comment: ''
  }

  ngOnInit() {
  }

  exit(){
    this.dialogRef.close(false);
  }

  confirm(value){
    
    if(value){
      if(value.title && value.comment){
        value.date = new Date().toLocaleString();
        this.dialogRef.close(value);
      }
      else{
        this.snackBar.open('Os dois campos são obrigatórios', 'Fechar', {
          duration: 7000
        });
      }
    }
  }

}
