import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class StudentProfessorService {
  baseUrl = 'http://localhost:8000';
  constructor(private authService:AuthService, private http: Http) { }

  getMyStudents(){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/studentProfessor/`, options)
      .map((res) => {
        return res.json();
      });
  }

  feedbackStudent(id, flag){
    const options = this.authService.addAuthHeader(true);
    const body = {
      id: id,
      flag: flag
    }
    return this.http.put(`${this.baseUrl}/studentProfessor/`, body, options)
      .map((res) => {
        return res.json();
      });
  }

}
