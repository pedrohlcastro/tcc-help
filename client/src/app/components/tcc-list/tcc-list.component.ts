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
}
