import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ProfessorListService {
  baseUrl = 'http://localhost:8000';
  constructor(private authService:AuthService, private http: Http) { }

  getProfessorList(){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/professor_list/`)
      .map((res) => {
        return res.json();
      });
  }

  inviteProfessor(userEmail){
    return this.http.post(`${this.baseUrl}/professor_list/invitation`, userEmail)
    .map((res)=> {
      return res.json();
    });

  }

  create(data){
    return this.http.post(`${this.baseUrl}/professor_list`, data)
      .map((res)=> {
        return res.json();
      });
  }
}