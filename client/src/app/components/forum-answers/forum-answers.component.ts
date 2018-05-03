import { Component, OnInit } from '@angular/core';
import { ForumPageComponent } from '../forum-page/forum-page.component';

@Component({
  selector: 'app-forum-answers',
  templateUrl: './forum-answers.component.html',
  styleUrls: ['./forum-answers.component.scss']
})
export class ForumAnswersComponent implements OnInit {

  answers = [{"id":"negrito","text":"somente uma resposta "}, {"id":"negresco","text":"outra parada muito doida mesmo"}];

  constructor() { }

  ngOnInit() {
  }
  


}
