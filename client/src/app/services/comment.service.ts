import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class CommentService {
  baseUrl = 'http://localhost:8000';
  constructor(private authService:AuthService, private http: Http) { }

  createComment(newComment){
    const options = this.authService.addAuthHeader(true);
    return this.http.post(`${this.baseUrl}/comment/`, newComment, options)
      .map((res) => {
        return res.json();
      });
  }

  getComment(){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/comment/`, options)
      .map((res) => {
        return res.json();
      });
  }

  createAnswer(data, commentId){
    const options = this.authService.addAuthHeader(true);
    const body = {
      topic: {
        id: commentId
      },
      data: data
    };
    return this.http.post(`${this.baseUrl}/answer/`, body, options)
      .map((res) => {
        return res.json();
      });
  }

  getCommentId(commentId){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/comment/${commentId}`, options)
      .map((res) => {
        return res.json();
      });
  }

  getReply(){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/answer/`, options)
      .map((res) => {
        return res.json();
      });
  }
}
