import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { StudentProfessorService } from '../../services/student-professor.service';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private studentProfessorService: StudentProfessorService,
    private snackBar: MatSnackBar) { }

  private userId;
  private user;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.studentProfessorService.getMyStudents(this.userId).subscribe(result =>{
      this.user = result;
    }, (err) =>{
      this.snackBar.open('Não foi possível recuperar professor.', 'Fechar', {
        duration: 7000
      });
    })
    

  }

}
