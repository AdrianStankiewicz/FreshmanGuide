import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Constants } from 'src/app/constants';
import { DocumentV } from 'src/app/models/document';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  documents: DocumentV[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments(): void {
    this.http.get<DocumentV[]>(`${Constants.backendApiUrl}Documents`).subscribe(
      (data) => {
        this.documents = data;
      },
      (error) => {
        console.error('Error fetching documents: ', error);
      }
    );
  }

  downloadDocument(documentId: number,title: string, extension: string): void {
    this.http.get(`${Constants.backendApiUrl}Documents/DownloadDocument/` + documentId, { responseType: 'blob' }).subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = title + '.' + extension.trim();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading document: ', error);
      }
    );
  }
}
