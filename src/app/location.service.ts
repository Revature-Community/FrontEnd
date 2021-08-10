import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Loc } from './models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseurl='http://localhost:8085/locations/'
  constructor(private http:HttpClient) {}

  //POST
  saveLocation(location: Loc): Observable<Loc> { 
    return this.http.post<Loc>(this.baseurl + "add/" + location.city + "/" + location.state, location)
  }

   // GET
 getLocations(): Observable<Loc> {
  return this.http.get<Loc>(this.baseurl)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}

// GET BY ID
getLocation(id: any): Observable<Loc> {
  return this.http.get<Loc>(this.baseurl + id)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  )
}

// Error handling
errorHandl(error: any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}


}
