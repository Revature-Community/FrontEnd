import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Downvote } from '../models/downvote';

@Injectable({
  providedIn: 'root'
})
export class DownvoteService {

  baseUrl = 'http://localhost:8083/downvote/';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getDownvotes(postId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + postId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  addDownvote(downvote:Downvote): Observable<Downvote> {
    return this.http.post<Downvote>(this.baseUrl + 'add-downvote', downvote, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  deleteDownvote(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + "delete/" + id)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
