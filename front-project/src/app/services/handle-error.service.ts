import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor() {}

  handleError(error: any): Observable<any> {
    if (error.status === 200) {
      return of(null); // Zignoruj błąd o kodzie 200
    }

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Błąd po stronie klienta
      errorMessage = error.error.message;
    } else {
      // Błąd po stronie serwera
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }
}
