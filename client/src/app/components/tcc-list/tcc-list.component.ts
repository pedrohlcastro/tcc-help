import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TccService } from '../../services/tcc.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { PdfService } from '../../services/pdf-service';

@Component({
  selector: 'app-tcc-list',
  templateUrl: './tcc-list.component.html',
  styleUrls: ['./tcc-list.component.scss']
})
export class TccListComponent implements OnInit {
  response = [];
  constructor(
    private tccService: TccService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    this.getAllTcc();
  }

  getAllTcc(){
    this.tccService.getAllTcc()
      .subscribe((res) => {
        this.response = res;
      }, (err) => {
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 5000});
      });
  }

  downloadFile(tccId, file_path) {
    return this.pdfService.downloadPDF(tccId, file_path)
    .subscribe((res) => {
      console.log(res);
    },
    error => {
      console.log(error.statusText);
      this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
    });
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.tccService.uploadPDF(formData).subscribe((res) => {
        this.snackBar.open('Documento Enviado com sucesso', 'Fechar', {duration: 3000});
        this.getAllTcc();
      }, (err) => {
        this.snackBar.open('Ocorreu um erro. Tente novamente', 'Fechar', {duration: 3000});
      });
    }
  }
}
