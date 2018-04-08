import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:8000';
  
  constructor(private http: Http) { }

  dumpExample(){
    // Existe um proxy para localhost:8000 (backend),
    // entao e igual fazer request para localhost:8000/
    return this.http.get(`${this.baseUrl}/api`)
      .map((res)=> {
        return res.json();
      });
  }
}
