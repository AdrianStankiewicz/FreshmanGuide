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
  dictionaryArr: Dictionary[] = [];

  getAllFromDictionarySub!: Subscription;

  constructor(
    private loadingS: LoadingService,
    private dictionaryS: DictionaryService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingS.startLoading();

    this.getAllFromDictionarySub = this.dictionaryS
      .getAllFromDictionary()
      .subscribe((words: Dictionary[]): void => {
        this.dictionaryArr = words;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = this.loadingS.stopLoading();
    }, 800);
  }

  ngOnDestroy(): void {
    this.loading = this.loadingS.startLoading();
  }
}
