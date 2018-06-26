import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import { ForumAnswerDialogComponent } from '../forum-answer-dialog/forum-answer-dialog.component';
import { ForumService } from '../../services/forum.service';
import {Router, ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-forum-answers',
  templateUrl: './forum-answers.component.html',
  styleUrls: ['./forum-answers.component.scss']
})
export class ForumAnswersComponent implements OnInit {

  answers = [];
  private topicId;
  topic;

  constructor(private dialog: MatDialog, private forumService: ForumService,
     private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.topicId = params['id'];
    });

    this.forumService.getTopicId(this.topicId).subscribe(result =>{
      this.topic = result;
    }, (err) => {
      this.snackBar.open('Não foi possível recuperar ID.', 'Fechar', {
        duration: 7000
      });
    });

    this.getAnswers();
  }

  getAnswers(){
    this.forumService.getReply().subscribe(res => {
      this.answers = res;
    });
  }
  
  createNewAnswer(){
    let dialogRef = this.dialog.open(ForumAnswerDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        result.date = new Date().toLocaleString();

        this.forumService.createAnswer(result, this.topicId).subscribe(result =>{
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
