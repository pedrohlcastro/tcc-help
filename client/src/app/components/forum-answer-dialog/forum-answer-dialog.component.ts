import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { ForumAnswersComponent } from '../forum-answers/forum-answers.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forum-answer-dialog',
  templateUrl: './forum-answer-dialog.component.html',
  styleUrls: ['./forum-answer-dialog.component.scss']
})
export class ForumAnswerDialogComponent implements OnInit {

  answer = {
    comment: ''
  }

  textAreaFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<ForumAnswersComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) { }

  ngOnInit() {
  }


  confirm(value){
    if(value){
      if(value.comment){
        this.dialogRef.close(value);
      }
      else{
        this.snackBar.open('Campo obrigatório', 'Fechar', {
          duration: 7000
        });
      }
    }
  }

  exit(){
    this.dialogRef.close(false);
  }

}
