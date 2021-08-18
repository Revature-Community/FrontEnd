import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PinpostService {

   baseUrl = 'http://localhost:8085/post/'

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  pinPostbyLocation(post:Object): Observable<any>{
    return this.http.put<any>(this.baseUrl+'pinPost/Location',post, this.httpOptions )
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

   pinPostbyCategory(post:Object): Observable<any>{
    return this.http.put<any>(this.baseUrl+'pinPost/Category',post, this.httpOptions )
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
