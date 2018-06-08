import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { ManageRulesPageComponent } from '../manage-rules-page/manage-rules-page.component';

import { TccService } from '../../services/tcc.service'

const URL = 'http://localhost:8000/api/';

@Component({
  selector: 'app-text-page-dialog',
  templateUrl: './text-page-dialog.component.html',
  styleUrls: ['./text-page-dialog.component.scss']
})
export class TextPageDialogComponent implements OnInit {

  public files:FileList;
  public file:File;
  
  constructor(
    private snackBar:MatSnackBar,
    private tccService:TccService,
    public dialogRef: MatDialogRef<ManageRulesPageComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) {  }

  ngOnInit() {
  }

  exit(){
    this.dialogRef.close(false);
  }

  

  handleFiles(fileList){
    if(fileList.length > 0){
      if(fileList.length == 1){
        let file = fileList.item(0);
        let ext = file.name.split('.')[file.name.split('.').length - 1];
        if(ext == 'pdf'){
         this.onFilesChange(fileList)
        }else{
          this.snackBar.open('Selecione um arquivo no formato PDF', 'Fechar', {
            duration: 7000
          });
        }
      }
      else{
        this.snackBar.open('Selecione apenas um arquivo', 'Fechar', {
          duration: 7000
        });
      }
    }
  }


  confirm(){
    let fileCount: number = this.files.length;
    let file = this.files.item(0);
    
    if (fileCount > 0) { 
      this.tccService.upload(file)
          .subscribe((res) => {
              this.snackBar.open('TCC enviado com Sucesso.', 'Fechar', {
              duration: 7000
              });
          }, (err) => {
            this.snackBar.open('Error ao enviar TCC, tente novamente.', 'Fechar', {
            duration: 7000
            });
        })
    }
    else{
      this.snackBar.open('Selecione o arquivo', 'Fechar', {
        duration: 7000
      });
    }
  }
  
  onFilesChange(files){
    this.files = files;
  }

  inputFile(){
    let element: HTMLElement = document.getElementsByName('sendFile')[0] as HTMLElement;
    element.click();
  }

}

