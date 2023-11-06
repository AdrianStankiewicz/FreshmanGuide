import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Constants } from 'src/app/constants';
import { DocumentV } from 'src/app/models/document';
import { DocumentsService } from 'src/app/services/http/documents.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, AfterViewInit, OnDestroy{
  documents: DocumentV[] = [];
  private _subscriptions = new Subscription();

  constructor(
    private documentsService: DocumentsService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments(): void {
    this.loadingService.startLoading();

    this._subscriptions.add(
      this.documentsService
        .getAllDocuments()
        .pipe(distinctUntilChanged())
        .subscribe((documents: DocumentV[]): void => {
          this.documents = documents.sort();
        })
    );
  }

  downloadDocument(documentId: number,title: string, extension: string): void {
    this.documentsService.downloadDocument(documentId).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = title + '.' + extension.trim();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
