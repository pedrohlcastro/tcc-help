import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { StudentProfessorService } from '../../services/student-professor.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private studentProfessorService: StudentProfessorService,
    private snackBar: MatSnackBar, private authService: AuthService) { }

  private userId;
  private students = [];
  private studentsID = [];
  private user;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.studentProfessorService.getMyStudents(this.userId).subscribe(result =>{
      console.log(result);
      this.students = result;

    }, (err) =>{
      this.snackBar.open('Não foi possível recuperar os alunos.', 'Fechar', {
        duration: 7000
      });
    })
  }

}
