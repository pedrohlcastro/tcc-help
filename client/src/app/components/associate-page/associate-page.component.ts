import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AssociateService } from '../../services/associate.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-associate-page',
  templateUrl: './associate-page.component.html',
  styleUrls: ['./associate-page.component.scss']
})
export class AssociatePageComponent implements OnInit {
  user;
  showUsers = [];
  filteredUsers;

  constructor(private authService: AuthService, private associateService: AssociateService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.getUserFromToken()
      .subscribe((res) => {
        this.user = res;

        // se o usuário for um aluno, ele verá os possíveis professores validados
        if (this.user.type === 1){
          this.associateService.getUsersByType(2)
          .subscribe((res) => {
            this.showUsers = res;
            this.filteredUsers = Object.assign([], this.showUsers);

            this.showUsers.forEach(showUser => {
              let ids = {
                student_id: this.user.id,
                professor_id: showUser.id
              }
              this.associateService.getAssociationsByIds(ids)
                .subscribe((res) => {
                  if (!res){
                    showUser["noassociation"] = true;
                  }
                  else {
                    showUser["noassociation"] = false;
                    showUser["activate"] = res.activate;
                    showUser["accept"] = res.accept;
                  }
                }, error => {
                  console.log(error.statusText);
                })
            });
          }, error => {
            console.log(error.statusText);
            this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
          });
        }

        // se o usuário for um professor, ele verá seus alunos (arrumar)
        if (this.user.type === 2){
          this.associateService.getUsersByType(1)
          .subscribe((res) => {
            this.showUsers = res;
            this.filteredUsers = Object.assign([], this.showUsers);

            this.showUsers.forEach(showUser => {
              let ids = {
                student_id: this.user.id,
                professor_id: showUser.id
              }
              this.associateService.getAssociationsByIds(ids)
                .subscribe((res) => {
                  if (!res){
                    showUser["noassociation"] = true;
                  }
                  else {
                    showUser["noassociation"] = false;
                    showUser["activate"] = res.activate;
                    showUser["accept"] = res.accept;
                  }
                }, error => {
                  console.log(error.statusText);
                })
              
            });
          });
        }
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
      }
    );
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
    let requestIndication = {
      accept: 0,
      activate: 1,
      student_id: this.user.id,
      professor_id: teacherId
    }

    this.associateService.create(requestIndication)
      .subscribe((res) => {
        this.snackBar.open("Indicação enviada com sucesso!.", 'Fechar', {duration: 3000});
      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
      }
    );


  }
}
