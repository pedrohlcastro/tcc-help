import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TccService } from '../../services/tcc.service';
import { MatSnackBar, MatDialog } from '@angular/material';

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
    private route: ActivatedRoute) { }

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

}
