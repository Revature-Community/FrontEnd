import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Upvote } from '../models/upvote';

@Injectable({
  providedIn: 'root'
})
export class UpvotesService {
  getCount(id: number): Observable<number> {
    return this.http.get<number>(this.baseUrl + "count/" + id)
    
  }

  baseUrl = 'http://localhost:8083/upvote/'
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getUpvotes(postId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + postId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  addUpvote(upvote: Upvote): Observable<Upvote> {
    // console.log("I got to the addUpvote in the upvote service" + 
    //   "\nupvote passed as a param = " + upvote + 
    //   "\n.stringify = " + JSON.stringify(upvote));
    return this.http.post<Upvote>(this.baseUrl + 'add-upvote', upvote, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  deleteUpvote(upvoteId: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'delete/' + upvoteId)
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
