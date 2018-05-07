import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

import { ForumService } from '../../services/forum.service';
import { ForumDialogComponent } from '../forum-dialog/forum-dialog.component';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss']
})
export class ForumPageComponent implements OnInit {
  topics = [];
  filteredTopics;
  constructor(private snackBar: MatSnackBar, private forumService:ForumService, public dialog: MatDialog, private router: Router) { }
  
  ngOnInit() {
    this.forumService.getTopic()
      .subscribe((res) => {
        this.topics = res;
        this.filteredTopics = Object.assign([], this.topics);
      });
  }

  createNewTopic(){
    let dialogRef = this.dialog.open(ForumDialogComponent, {
        width: '75%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
        if(result){
            this.forumService.createTopic(result)
                .subscribe((res) => {
                    this.topics.push(res);
                    this.filteredTopics = Object.assign([], this.topics);
                })
        } 
    });
  }

  accessTopic(index){
    const item = this.topics[index];
    this.router.navigate(['/forum-answers', item.id]);
  }

  filterItem(value){
    if(!value)
      this.filteredTopics = this.topics;
    else {
      this.filteredTopics = Object.assign([], this.topics).filter(
        item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    }
  }

}
