import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class CommentService {
  baseUrl = 'http://localhost:8000';
  constructor(private authService:AuthService, private http: Http) { }

  createTopic(newTopic){
    const options = this.authService.addAuthHeader(true);
    return this.http.post(`${this.baseUrl}/topic/`, newTopic, options)
      .map((res) => {
        return res.json();
      });
  }

  getTopic(){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/topic/`, options)
      .map((res) => {
        return res.json();
      });
  }

  createAnswer(data, topicId){
    const options = this.authService.addAuthHeader(true);
    const body = {
      topic: {
        id: topicId
      },
      data: data
    };
    return this.http.post(`${this.baseUrl}/comment-page/`, body, options)
      .map((res) => {
        return res.json();
      });
  }

  getTopicId(topicId){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/topic/${topicId}`, options)
      .map((res) => {
        return res.json();
      });
  }

  getReply(){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/comment-page/`, options)
      .map((res) => {
        return res.json();
      });
  }
}
