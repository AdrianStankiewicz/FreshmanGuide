import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dictionary } from 'src/app/models/dictionary';
import { DictionaryService } from 'src/app/services/http/dictionary.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
})
export class DictionaryComponent {
  loading!: boolean;
  words: Dictionary[] = [];

  getAllFromDictionarySub!: Subscription;

  constructor(
    private loadingService: LoadingService,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();

    this.getAllFromDictionarySub = this.dictionaryService
      .getAllFromDictionary()
      .subscribe((words: Dictionary[]): void => {
        this.words = words;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = this.loadingService.stopLoading();
    }, 800);
  }

  ngOnDestroy(): void {
    this.loading = this.loadingService.startLoading();
  }
}
