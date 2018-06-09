import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { CheckTccPageComponent } from '../check-tcc-page/check-tcc-page.component';

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.scss']
})
export class RejectDialogComponent implements OnInit {

  constructor(
    private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<CheckTccPageComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) { }
  justification;
  ngOnInit() {
  }

  exit(){
    this.dialogRef.close(false);
  }

  confirm(value){
    if(value){
      if(value.justification){
        this.dialogRef.close(value);
      }
      else{
        this.snackBar.open('O Campo Justificativa é obrigatório', 'Fechar', {
          duration: 7000
        });
      }
    }
  }

}
