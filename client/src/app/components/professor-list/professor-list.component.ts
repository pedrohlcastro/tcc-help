import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfessorListService } from '../../services/professor-list.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.scss']
})
export class ProfessorListComponent implements OnInit {
  user;
  showUsers = [];
  filteredUsers;
  alreadyAssociate = 0;
  constructor(private authService: AuthService, private professorListService: ProfessorListService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.getUserFromToken()
      .subscribe((res) => {
        this.user = res;
        if (this.user.type !== 1){
          this.snackBar.open("Somente alunos podem acessar esta página.", 'Fechar', {duration: 3000});
          
          this.sleep(3000).then(() => {
            window.location.href = '/account-page';
          });
        }

        this.professorListService.checkAssociation(this.user.id)
          .subscribe((res) => {
            if (res !== null)
              this.alreadyAssociate = 1;
          },
          error => {
            console.log(error.statusText);
          }
        );

        this.professorListService.getProfessorList(this.user.id)
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
  
  emailForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ])
  });

  sendEmail = function(){
    if (this.emailForm.invalid){
      this.snackBar.open("O e-mail é invalido, favor tentar novamente.", 'Fechar', {duration: 3000});
      return;
    }
    const userEmail = {
      nameStudent: this.user.name,
      email: this.emailForm.get("email").value
    };

    this.professorListService.inviteProfessor(userEmail)
      .subscribe((res) => {
        console.log(res.msg);
        this.snackBar.open("O convite foi enviado através do e-mail.", 'Fechar', {duration: 3000});
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

  filterItem(value){
    if(!value)
      this.filteredUsers = this.showUsers;
    else {
      this.filteredUsers = Object.assign([], this.showUsers).filter(
        item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    }
  }

  sendIndication(teacherId){
    if (this.alreadyAssociate === 1){
      this.snackBar.open("Você já está associado a algum professor.", 'Fechar', {duration: 3000});
      return;
    }
    let requestIndication = {
      accept: 0,
      activate: 1,
      student_id: this.user.id,
      professor_id: teacherId
    }

    this.professorListService.create(requestIndication)
      .subscribe((res) => {
        this.snackBar.open("Indicação enviada com sucesso.", 'Fechar', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
      }
    );

    let userUpdated = this.showUsers.find( (User)=> { return (User["id"] == teacherId)} );
    userUpdated["UserProfessor.StudentProfessor.activate"] = 1;
    userUpdated["UserProfessor.StudentProfessor.accept"] = 0;
    userUpdated["UserProfessor.StudentProfessor.id"] = undefined;
    userUpdated["UserProfessor.StudentProfessor.professor_id"] = teacherId;
    userUpdated["UserProfessor.StudentProfessor.student_id"] = this.user.id;
    this.filteredUsers = Object.assign([], this.showUsers);

    this.alreadyAssociate = 1;
  }

  removeIndication(professor_id){
    const data = {
      accept: 0,
      activate: 0
    }

    this.professorListService.remove(data, this.user.id, professor_id)
      .subscribe((res) => {
        this.snackBar.open("Associação removida com sucesso", 'Fechar', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
      })
    
    let userUpdated = this.showUsers.find( (User)=> { return (User["UserProfessor.StudentProfessor.student_id"] == this.user.id)} );
    userUpdated["UserProfessor.StudentProfessor.id"] = undefined;
    userUpdated["UserProfessor.StudentProfessor.professor_id"] = undefined;
    userUpdated["UserProfessor.StudentProfessor.student_id"] = undefined;
    userUpdated["UserProfessor.StudentProfessor.activate"] = 0;
    userUpdated["UserProfessor.StudentProfessor.accept"] = 0;
    this.filteredUsers = Object.assign([], this.showUsers);

    this.alreadyAssociate = 0;
  }
}
