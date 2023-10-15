import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

interface CustomError {
  status: number;
  error: { message: string };
  message: any;
}

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor() {}

  public handleError(error: CustomError): Observable<any> {
    if (error.status === 200) {
      return of(null); // ignore code 200 error
    }

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      errorMessage = error.error.message;
    } else {
      // server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError((): string => errorMessage);
  }
}
