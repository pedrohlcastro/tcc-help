import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class ForumService {
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
}
