import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentProfessorService } from '../../services/student-professor.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { YesnoDialogComponent } from '../yesno-dialog/yesno-dialog.component'
import { element } from 'protractor';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private studentProfessorService: StudentProfessorService,
    private snackBar: MatSnackBar, private authService: AuthService, private router: Router,
    private dialog: MatDialog) { }

  private userId;
  private students = [];
  private aproved = [];
  private pendent = [];
  private disconected = [];
  filteredAproved;
  filteredPendent;
  filteredDisconected;

  ngOnInit() {
    this.authService.getUserFromToken().subscribe((res) => {
      const myId = res.id;
      this.studentProfessorService.getMyStudents().subscribe(result => {
        this.students = result;
        for (let i = 0; i < this.students.length; i++) {
          let element = this.students[i];
          if (element["UserProfessor.StudentProfessor.activate"] === 0 && element["UserProfessor.StudentProfessor.student_id"] != myId) {
            this.disconected.push(element);
          }
          else if (element["UserProfessor.StudentProfessor.accept"] === 1 && element["UserProfessor.StudentProfessor.student_id"] != myId) {
            this.aproved.push(element);
          }
          else if (element["UserProfessor.StudentProfessor.accept"] === 0 && element["UserProfessor.StudentProfessor.student_id"] != myId) {
            this.pendent.push(element);
          }
        }
      }, (err) => {
        this.snackBar.open('Não foi possível recuperar os alunos.', 'Fechar', {
          duration: 7000
        });
      })
    })
    
    this.filteredAproved = this.aproved;
    this.filteredPendent = this.pendent;
    this.filteredDisconected = this.disconected;

  }
  
  handlePendentStudent(index, flag) {
    let dialogRef = this.dialog.open(YesnoDialogComponent, {
      width: '40%',
      height: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let element = this.pendent[index];
        let id = element["UserProfessor.StudentProfessor.id"];
        //id da tabela de associação
        this.studentProfessorService.feedbackStudent(id, flag, 1).subscribe(result => {
          window.location.reload();
        }, (err) => {
          this.snackBar.open('Não foi possível responder ao aluno.', 'Fechar', {
            duration: 7000
          });
        })
      }
    })
  }
 
  removeStudent(index){
    let dialogRef = this.dialog.open(YesnoDialogComponent, {
      width: '40%',
      height: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let element = this.aproved[index];
        let id = element["UserProfessor.StudentProfessor.id"];
        this.studentProfessorService.feedbackStudent(id, 0, 0).subscribe(result => {
          window.location.reload();
        }, (err) => {
          this.snackBar.open('Não foi possível remover o aluno.', 'Fechar', {
            duration: 7000
          });
        })
      }
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
