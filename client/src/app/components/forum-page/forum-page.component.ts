import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {MatDialog} from '@angular/material';

import { ForumService } from '../../services/forum.service';
import { ForumDialogComponent } from '../forum-dialog/forum-dialog.component';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss']
})
export class ForumPageComponent implements OnInit {
  topics = [{
      title: 'titulo',
      comment: 'cometarip2',
      date: 'data',
      id: 1
  }, {
    title: 'titulo2',
    comment: 'cometarip2',
    date: 'data2',
    id: 2
}];

  constructor(private snackBar: MatSnackBar, private forumService:ForumService, public dialog: MatDialog,) { }
  
  ngOnInit() {
    //   this.forumService.getTopic()
    //     .subscribe((res) => {
    //         this.topics = res;
    //     });
  }

  createNewTopic(){
    let dialogRef = this.dialog.open(ForumDialogComponent, {
        width: '75%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result){
            this.forumService.createTopic(result)
                .subscribe((res) => {
                    this.topics.push(res);
                })
        } 
    });
  }

  accessTopic(index){
    const item = this.topics[index];
    
  }

}
