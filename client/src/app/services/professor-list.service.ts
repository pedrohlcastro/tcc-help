import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ProfessorListService {
  baseUrl = 'http://localhost:8000';
  constructor(private authService:AuthService, private http: Http) { }

  getProfessorList(student_id){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/professor_list/${student_id}`, options)
      .map((res) => {
        return res.json();
      });
  }

  inviteProfessor(userEmail){
    const options = this.authService.addAuthHeader(true);
    return this.http.post(`${this.baseUrl}/professor_list/invitation`, userEmail, options)
    .map((res)=> {
      return res.json();
    });

  }

  checkAssociation(student_id){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/professor_list/already_associate/${student_id}`, options)
      .map((res) => {
        return res.json();
      });
  }

  create(data){
    const options = this.authService.addAuthHeader(true);
    return this.http.post(`${this.baseUrl}/professor_list`, data, options)
      .map((res)=> {
        return res.json();
      });
  }

  remove(params, student_id, professor_id){
    const options = this.authService.addAuthHeader(true);
    return this.http.put(`${this.baseUrl}/professor_list/${student_id}/${professor_id}`, params, options)
      .map((res) => {
        return res.json();
      });
  }
}