import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from '../handle-error.service';
import { DocumentV } from 'src/app/models/document';
import { Observable, catchError, retry } from 'rxjs';
import { Constants } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}
  
  public getAllDocuments(): Observable<DocumentV[]>{
    return this.http.get<DocumentV[]>(`${Constants.backendApiUrl}Documents`).pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  public downloadDocument(documentId: number): Observable<Blob>{
    return this.http.get(`${Constants.backendApiUrl}Documents/DownloadDocument/` + documentId, { responseType: 'blob' });
  }
}
