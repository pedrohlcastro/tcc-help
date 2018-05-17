import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { ForumAnswersComponent } from '../forum-answers/forum-answers.component';
import { FormControl, Validators } from '@angular/forms';
import { StudentsListComponent } from '../students-list/students-list.component';

@Component({
  selector: 'app-yesno-dialog',
  templateUrl: './yesno-dialog.component.html',
  styleUrls: ['./yesno-dialog.component.scss']
})
export class YesnoDialogComponent implements OnInit {

  constructor(private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<StudentsListComponent>,
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
