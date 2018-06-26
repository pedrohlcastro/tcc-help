import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { CommentService } from '../../services/comment.service';
import {Router, ActivatedRoute, Params} from '@angular/router'
import { AuthService } from '../../services/auth.service';
import { TccService } from '../../services/tcc.service';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit {
  comments = [];
  tccId;
  user;
  constructor(
    private dialog: MatDialog,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private tccService: TccService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tccId = params['id'];
      this.tccService.getAccessRights(this.tccId).subscribe((res) => {
        if(res.status != 'Success') {
          this.snackBar.open("Você não tem permissão para acessar essa página...", 'Fechar', {duration: 5000});
          this.router.navigateByUrl('/account-page');
        }
      });
    });

    this.authService.getUserFromToken()
      .subscribe((res) => {
        this.user = res;
        console.log(this.user.id);

      },
      error => {
        console.log(error.statusText);
        this.snackBar.open("Ocorreu algum erro, favor tentar novamente.", 'Fechar', {duration: 3000});
      }
    );
    this.getComments();
  }

  getComments(){
    this.commentService.getTccComments(this.tccId).subscribe(result =>{
      this.comments = result;
    }, (err) => {
      this.snackBar.open('Não foi possível recuperar ID.', 'Fechar', {
        duration: 7000
      });
    });
  }

  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  createNewComment(){
    let dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const data = {
          user_id: this.user.id,
          tcc_id: this.tccId,
          date: this.formatDate(new Date()),
          message: result.comment
        }

        this.commentService.createComment(data).subscribe(result =>{
          this.snackBar.open('Criado com sucesso.', 'Fechar', {
            duration: 7000
          });
          this.getComments();
        }, (err) => {
          this.snackBar.open('Não foi possível criar resposta.', 'Fechar', {
            duration: 7000
          });
        });
      }
    });
  }
}
