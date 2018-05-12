import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentProfessorService } from '../../services/student-professor.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private studentProfessorService: StudentProfessorService,
    private snackBar: MatSnackBar, private authService: AuthService, private router: Router) { }

  private userId;
  private students = [];
  private aproved = [];
  private pendent = [];
  private disconected = [];
  private filteredAproved;
  private filteredPendent;
  private filteredDisconected;

  ngOnInit() {
    this.studentProfessorService.getMyStudents().subscribe(result => {
      //console.log(result);
      this.students = result;
      for (let i = 0; i < this.students.length; i++) {
        let element = this.students[i];
        if (element["UserProfessor.StudentProfessor.activate"] === 0) {
          this.disconected.push(element);
        }
        else if (element["UserProfessor.StudentProfessor.accept"] === 1) {
          this.aproved.push(element);
        }
        else if (element["UserProfessor.StudentProfessor.accept"] === 0) {
          this.pendent.push(element);
        }
      }
    }, (err) => {
      this.snackBar.open('Não foi possível recuperar os alunos.', 'Fechar', {
        duration: 7000
      });
    })
    this.filteredAproved = this.aproved;
    this.filteredPendent = this.pendent;
    this.filteredDisconected = this.disconected;

  }
  visualizeAprovedStudent(index) {
    let element = this.aproved[index];
    /*continue*/
  }
  acceptPendentStudent(index) {
    let element = this.pendent[index];
    let id = element["UserProfessor.StudentProfessor.id"];
    //id da tabela de associação
    this.studentProfessorService.feedbackStudent(id, 1).subscribe(result => {
      window.location.reload();
    }, (err) => {
      this.snackBar.open('Não foi possível responder ao aluno.', 'Fechar', {
        duration: 7000
      });
    })
  }
  denyPendentStudent(index) {
    let element = this.pendent[index];
    let id = element["UserProfessor.StudentProfessor.id"];
    //id da tabela de associação
    this.studentProfessorService.feedbackStudent(id, 2).subscribe(result => {
      window.location.reload();
    }, (err) => {
      this.snackBar.open('Não foi possível responder ao aluno.', 'Fechar', {
        duration: 7000
      });
    })
  }
  filterAproved(value) {
    if (!value)
      this.filteredAproved = this.aproved;
    else {
      this.filteredAproved = Object.assign([], this.aproved).filter(
        item => item["UserProfessor.name"].toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    }
    //console.log(this.filteredAproved);
  }
  filterPendent(value) {
    if (!value)
      this.filteredPendent = this.pendent;
    else {
      this.filteredPendent = Object.assign([], this.pendent).filter(
        item => item["UserProfessor.name"].toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    }
    //console.log(this.filteredPendent);
  }
  filterDisconected(value) {
    if (!value)
      this.filteredDisconected = this.disconected;
    else {
      this.filteredDisconected = Object.assign([], this.disconected).filter(
        item => item["UserProfessor.name"].toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    }
    //console.log(this.filteredDisconected);
  }
}
