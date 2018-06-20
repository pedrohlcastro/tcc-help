import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { ForumAnswersComponent } from '../forum-answers/forum-answers.component';
import { FormControl, Validators } from '@angular/forms';
import { CheckTccPageComponent } from '../check-tcc-page/check-tcc-page.component';

@Component({
  selector: 'app-choose-professor-dialog',
  templateUrl: './choose-professor-dialog.component.html',
  styleUrls: ['./choose-professor-dialog.component.scss']
})
export class ChooseProfessorDialogComponent implements OnInit {

  constructor(private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<CheckTccPageComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any) { }

  ngOnInit() {
  }

  confirm(value){
    this.dialogRef.close(value);
  }

  exit(){
    this.dialogRef.close(false);
  }

}
