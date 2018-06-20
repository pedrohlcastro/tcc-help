import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class TccService {
  baseUrl = 'http://localhost:8000';

  constructor(private authService:AuthService, private http: Http) { }

  getMatches(tccId){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/tcc/getRulesSpelling/${tccId}`, options)
      .map((res) => {
        return res.json();
      });
  }

  runSuggestions(tccId){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/tcc/runRules/${tccId}`, options)
      .map((res) => {
        return res.json();
      });
  }

  choose(checkRuleId, choice, justification=null){
    const options = this.authService.addAuthHeader(true);
    const body = {
      choice: choice,
      id: checkRuleId,
      justification
    };
    return this.http.put(`${this.baseUrl}/check-rule/choose`, body, options)
      .map((res) => {
        return res.json();
      });
  }

  chooseSpelling(checkSpellingId, choice, justification=null){
    const options = this.authService.addAuthHeader(true);
    const body = {
      choice: choice,
      id: checkSpellingId,
      justification
    };
    return this.http.put(`${this.baseUrl}/check-spelling/choose`, body, options)
      .map((res) => {
        return res.json();
      });
  }

  sendToProfessor(tccId) {
    const options = this.authService.addAuthHeader(true);
    const body = {
      id: tccId
    };
    return this.http.put(`${this.baseUrl}/tcc/sendToProfessor`, body, options)
      .map((res) => {
        return res.json();
      });
  }

  getSpelling(tccId){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/check-spelling/${tccId}`, options)
      .map((res) => {
        return res.json();
      });
  }

  runAnalisys(tccId, languages, professorId=null){
    const options = this.authService.addAuthHeader(true);
    const body = {
      languages,
      professorId: professorId
    }
    return this.http.post(`${this.baseUrl}/tcc/runAnalisys/${tccId}`, body, options)
      .map((res) => {
        return res.json();
      });
  }

  getStatsTcc(tccId) {
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/tcc/getStatistics/${tccId}`, options)
      .map((res) => {
        return res.json();
      });
  }

  getAccessRights(tccId) {
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/access/${tccId}`, options)
      .map((res) => {
        return res.json();
      });
  }
}
