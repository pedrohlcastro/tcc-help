import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { CommentService } from '../../services/comment.service';
import {Router, ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit {

  answers = [];
  private topicId;
  private topic;

  constructor(private dialog: MatDialog, private commentService: CommentService,
     private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.topicId = params['id'];
    });

    this.commentService.getTopicId(this.topicId).subscribe(result =>{
      this.topic = result;
    }, (err) => {
      this.snackBar.open('Não foi possível recuperar ID.', 'Fechar', {
        duration: 7000
      });
    });

    this.getAnswers();
  }

  getAnswers(){
    this.commentService.getReply().subscribe(res => {
      this.answers = res;
    });
  }
  
  createNewAnswer(){
    let dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        result.date = new Date().toLocaleString();

        this.commentService.createAnswer(result, this.topicId).subscribe(result =>{
          this.snackBar.open('Criado com sucesso.', 'Fechar', {
            duration: 7000
          });
          this.getAnswers();

        }, (err) => {
          this.snackBar.open('Não foi possível criar resposta.', 'Fechar', {
            duration: 7000
          });
        });

      } 
    });
  }




}
