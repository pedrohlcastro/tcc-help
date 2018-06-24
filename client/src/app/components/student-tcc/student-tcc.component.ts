import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TccService } from '../../services/tcc.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PdfService } from '../../services/pdf-service';

@Component({
  selector: 'app-student-tcc',
  templateUrl: './student-tcc.component.html',
  styleUrls: ['./student-tcc.component.scss']
})
export class StudentTccComponent implements OnInit {
  studentProfessorId;
  response = [];
  constructor(
    private tccService: TccService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private pdfService: PdfService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.studentProfessorId = params['id'];
    });
    this.tccService.getTccVisibleToProfessor(this.studentProfessorId)
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
