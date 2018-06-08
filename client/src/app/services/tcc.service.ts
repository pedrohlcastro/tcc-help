import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class TccService {
  baseUrl = 'http://localhost:8000';

  constructor(private authService:AuthService, private http: Http) { }

  getMatches(tccId){
    const options = this.authService.addAuthHeader(true);
    return this.http.get(`${this.baseUrl}/check-rule/${tccId}`, options)
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

  choose(checkRuleId, choice){
    const options = this.authService.addAuthHeader(true);
    const body = {
      choice: choice,
      id: checkRuleId
    };
    return this.http.put(`${this.baseUrl}/check-rule/choose`, body, options)
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
  
  upload(data){
    let file = new FormData();
    file.append('file', data);
    const options = this.authService.addAuthHeader(true);
    console.log('Parte 1\n')
    
    return this.http.post(`${this.baseUrl}/tcc/upload`, file, options)
      .map((res) => {
        return res.json();
      });

  }
}
