import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { jwtLoginResponse } from '../models/jwtLoginReponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  // baseurl = 'http://ec2-35-175-212-202.compute-1.amazonaws.com:9095/users/'
  baseurl = 'http://localhost:8081/users/';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  login(uname: string, pass: string): Observable<User> {
    let credentials = {
      email: uname,
      password: pass
    }
    return this.http.post<User>(`${this.baseurl}login`, JSON.stringify(credentials), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  login2(uname: string, pass: string): Observable<jwtLoginResponse> {
    let credentials = {
      email: uname,
      password: pass
    }
    return this.http.post<jwtLoginResponse>(`${this.baseurl}login`, JSON.stringify(credentials), this.httpOptions)
    .pipe(
      
      catchError(this.errorHandler)
    )
  }

  register(user: User) {
    return this.http.post<Object>(`${this.baseurl}add`, JSON.stringify(user), this.httpOptions)
  }

  
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Invalid username or password`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }
}
