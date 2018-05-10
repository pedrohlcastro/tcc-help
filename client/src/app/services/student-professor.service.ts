import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class StudentProfessorService {
  baseUrl = 'http://localhost:8000';
  constructor(private authService:AuthService, private http: Http) { }

  getMyStudents(userId){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/studentProfessor/${userId}`, options)
      .map((res) => {
        return res.json();
      });
  }

}
