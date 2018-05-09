import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class AssociateService {
  baseUrl = 'http://localhost:8000';
  constructor(private authService:AuthService, private http: Http) { }

  getUsersByType(userType){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/users/getbytype/${userType}`, options)
      .map((res) => {
        return res.json();
      });
  }

  getAssociationsByIds(data){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/associate/${data.student_id}/${data.professor_id}`)
      .map((res) => {
        return res.json();
      });
  }

  create(data){
    return this.http.post(`${this.baseUrl}/associate`, data)
      .map((res)=> {
        return res.json();
      });
  }
}