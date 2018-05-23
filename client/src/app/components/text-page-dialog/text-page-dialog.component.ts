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

  newPath(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
      return v.toString(16);
    });
  }

  confirm(){
    let path = `${this.newPath()}.pdf`;
    let file = this.files.item(0);
    console.log(file.name);
    // let fileCount: number = this.files.length;
    // let formData = new FormData();
    
    // if (fileCount > 0) { 
    //   formData.append('file', this.files.item(0));
    //   this.tccService.upload(formData,path)
    //       .subscribe((res) => {
    //           this.snackBar.open('TCC enviado com Sucesso.', 'Fechar', {
    //           duration: 7000
    //           });
    //       }, (err) => {
    //         this.snackBar.open('Error ao enviar TCC, tente novamente.', 'Fechar', {
    //         duration: 7000
    //         });
    //     })

    //   const newTcc = {
    //     file_path: path,
    //     date: Date.now(),
    //   };

    // }
    // else{
    //   this.snackBar.open('Selecione o arquivo', 'Fechar', {
    //     duration: 7000
    //   });
    // }
  }
  
  onFilesChange(files){
    this.file = files.item(0);
    this.files = files;
  }

  inputFile(){
    let element: HTMLElement = document.getElementsByName('sendFile')[0] as HTMLElement;
    element.click();
  }

}

