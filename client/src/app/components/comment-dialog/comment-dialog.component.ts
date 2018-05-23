import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { CommentPageComponent } from '../comment-page/comment-page.component';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  constructor(
    private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<CommentPageComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) {  }

  comment;

  ngOnInit() {
  }

  exit(){
    this.dialogRef.close(false);
  }

  confirm(value){
    
    if(value){
      if(value.comment){
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
