import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfessorListService } from '../../services/professor-list.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { YesnoDialogComponent } from '../yesno-dialog/yesno-dialog.component'

@Component({
  selector: 'app-validate-professor',
  templateUrl: './validate-professor.component.html',
  styleUrls: ['./validate-professor.component.scss']
})
export class ValidateProfessorComponent implements OnInit {
  user;
  showUsers = [];
  filteredUsers;
  alreadyAssociate = 0;
  constructor(private authService: AuthService, private professorListService: ProfessorListService,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.getUserFromToken()
      .subscribe((res) => {
        this.user = res;
        if (this.user.type !== 0){
          this.snackBar.open("Somente administradores podem acessar esta página.", 'Fechar', {duration: 3000});
          
          this.sleep(3000).then(() => {
            window.location.href = '/account-page';
          });
        }

        this.professorListService.getAll()
          .subscribe((res) => {
            this.showUsers = res;
            this.filteredUsers = Object.assign([], this.showUsers);
            this.filteredUsers.forEach(element => {
              console.log(element);
              console.log(element['UserProfessor.StudentProfessor.accept'] );
              
            });
          }, error => {
            console.log(error.statusText);
            this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
          });
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
      }
    );
  }

  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  validateProfessor(teacherId) {
    
    const requestUser = {
      id: teacherId,
      validate_professor: 1
    };

    this.authService.updateUser(requestUser)
      .subscribe((res) => {
        console.log(res.msg);
        this.snackBar.open("Dados salvos com sucesso.", 'Fechar', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Não foi possível salvar os dados, favor tentar novamente.", 'Fechar', {duration: 3000});
      }
    );

    let userUpdated = this.showUsers.find( (User)=> { return (User["id"] == teacherId)} );
    userUpdated["validate_professor"] = 1;
    this.filteredUsers = Object.assign([], this.showUsers);
  }

  invalidateProfessor(teacherId) {
    
    const requestUser = {
      id: teacherId,
      validate_professor: 0
    };

    this.authService.updateUser(requestUser)
      .subscribe((res) => {
        console.log(res.msg);
        this.snackBar.open("Dados salvos com sucesso.", 'Fechar', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Não foi possível salvar os dados, favor tentar novamente.", 'Fechar', {duration: 3000});
      }
    );

    let userUpdated = this.showUsers.find( (User)=> { return (User["id"] == teacherId)} );
    userUpdated["validate_professor"] = 0;
    this.filteredUsers = Object.assign([], this.showUsers);
  }
}
