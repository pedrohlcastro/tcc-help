import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class RuleService {
  baseUrl = 'http://localhost:8000';
  constructor(private authService:AuthService, private http: Http) { }

  createRule(newRule){
    const options = this.authService.addAuthHeader(true);
    return this.http.post(`${this.baseUrl}/rules/`, newRule, options)
      .map((res) => {
        return res.json();
      });
  }

  updateRule(updateData, id){
    const options = this.authService.addAuthHeader(true);
    return this.http.put(`${this.baseUrl}/rules/${id}/`, updateData, options)
      .map((res) => {
        return res.json();
      });
  }

  deleteRule(id){
    const options = this.authService.addAuthHeader(true);
    return this.http.delete(`${this.baseUrl}/rules/${id}/`, options)
      .map((res) => {
        return res.json();
      });
  }

  getRules(){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/rules/`, options)
      .map((res) => {
        return res.json();
      });
  }

  getRule(id){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/rules/${id}/`, options)
      .map((res) => {
        return res.json();
      });
  }
}
