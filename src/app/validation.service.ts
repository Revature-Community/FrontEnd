import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, retry } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class ValidationServiceService {
  // baseUrl = 'http://ec2-35-175-212-202.compute-1.amazonaws.com:9095/user/';
  baseUrl = 'http://localhost/8085';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type' : 'application/json',
    }),
  };

  validateUser(username: string, password: string): Observable<User> {
    let info = {username,password};
    return this.http.post<User>(
        `${this.baseUrl}verification`, JSON.stringify(info), this.httpOptions
    ).pipe(
     retry(1),
     catchError(this.errorHandler)
    );
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`
    }
    console.log(errorMessage);
    alert("Invalid username or password, please try again.")
    return throwError(errorMessage);
  }


}