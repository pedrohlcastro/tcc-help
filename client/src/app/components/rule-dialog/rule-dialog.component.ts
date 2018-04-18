import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

import { ManageRulesPageComponent } from '../manage-rules-page/manage-rules-page.component';

@Component({
  selector: 'app-rule-dialog',
  templateUrl: './rule-dialog.component.html',
  styleUrls: ['./rule-dialog.component.scss']
})
export class RuleDialogComponent implements OnInit {

  constructor(
    private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<ManageRulesPageComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) {
    if (dataReceive) {
      this.rule.regex = dataReceive.regex;
      this.rule.message = dataReceive.message;
    }
  }

  rule = {
    regex: '',
    message: ''
  }

  ngOnInit() {
  }

  exit(){
    this.dialogRef.close(false);
  }

  confirm(value){
    if(value){
      if(value.regex && value.message){
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
