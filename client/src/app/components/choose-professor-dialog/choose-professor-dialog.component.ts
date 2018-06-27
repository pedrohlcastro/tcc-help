import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { ForumAnswersComponent } from '../forum-answers/forum-answers.component';
import { FormControl, Validators } from '@angular/forms';
import { CheckTccPageComponent } from '../check-tcc-page/check-tcc-page.component';
import { ProfessorListService } from '../../services/professor-list.service';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-choose-professor-dialog',
  templateUrl: './choose-professor-dialog.component.html',
  styleUrls: ['./choose-professor-dialog.component.scss']
})
export class ChooseProfessorDialogComponent implements OnInit {

  private teachers = [];
  private selectedTeacher = String;

  constructor(
    private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<CheckTccPageComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any,
    private professorListService: ProfessorListService) { }

  ngOnInit() {

    this.professorListService.getProfessorList(0)
          .subscribe((res) => {
            res.forEach(element => {
              this.teachers.push(element);
            });
          }, error => {
            this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
          });       
  }

  confirm(value){
    this.dialogRef.close(value);
  }

  exit(){
    this.dialogRef.close(false);
  }

}
