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
  groupedWords: [string, Dictionary[]][] = [];

  getAllFromDictionarySub!: Subscription;

  constructor(
    private loadingService: LoadingService,
    private dictionaryService: DictionaryService
  ) { }

  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();

    this.getAllFromDictionarySub = this.dictionaryService
      .getAllFromDictionary()
      .subscribe((words: Dictionary[]): void => {
        this.words = words.sort();
        this.groupWords();
      });
  }

  groupWords(): void {
    this.groupedWords = [];

    this.words.forEach((word) => {
      const firstLetter = word.word[0].toUpperCase();

      const groupIndex = this.groupedWords.findIndex(
        (group) => group[0] === firstLetter
      );

      if (groupIndex === -1) {
        this.groupedWords.push([firstLetter, [word]]);
      } else {
        this.groupedWords[groupIndex][1].push(word);
      }
    });

    this.groupedWords.sort();
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
