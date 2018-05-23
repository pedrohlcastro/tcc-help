import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class CommentService {
  baseUrl = 'http://localhost:8000';
  constructor(private authService:AuthService, private http: Http) { }

  createComment(data){
    const options = this.authService.addAuthHeader(true);
    console.log(data);
    return this.http.post(`${this.baseUrl}/comment/`, data, options)
      .map((res) => {
        return res.json();
      });
  }

  getTccComments(commentId){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/comment/${commentId}`, options)
      .map((res) => {
        return res.json();
      });
  }

  removeComment(commentId){
    const options = this.authService.addAuthHeader(true);
    return this.http.delete(`${this.baseUrl}/comment/${commentId}`, options)
      .map((res) => {
        return res.json();
      });
  }
}
