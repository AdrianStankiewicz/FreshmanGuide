import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Dictionary } from 'src/app/models/dictionary';
import { DictionaryService } from 'src/app/services/http/dictionary.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
})
export class DictionaryComponent implements OnInit, AfterViewInit, OnDestroy {
  protected words: Dictionary[] = [];
  protected groupedWords!: [string, Dictionary[]][];

  private _subscriptions = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();

    this._subscriptions.add(
      this.dictionaryService
        .getAllFromDictionary()
        .pipe(distinctUntilChanged())
        .subscribe((words: Dictionary[]): void => {
          this.words = words.sort();
          this.groupWords();
        })
    );
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private groupWords(): void {
    this.groupedWords = [];

    this.words.forEach((word: Dictionary): void => {
      const firstLetter = word.word[0].toUpperCase();

      const groupIndex = this.groupedWords.findIndex(
        (group: [string, Dictionary[]]): boolean => group[0] === firstLetter
      );

      if (groupIndex === -1) {
        this.groupedWords.push([firstLetter, [word]]);
      } else {
        this.groupedWords[groupIndex][1].push(word);
      }
    });

    this.groupedWords.sort();
  }

  protected trackByFn(index: number, item: Dictionary): number {
    return item.id;
  }
}
