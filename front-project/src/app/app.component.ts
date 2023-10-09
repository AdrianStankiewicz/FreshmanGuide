import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  protected title = 'front-project';
  protected loading = false;

  private _subscriptions = new Subscription();

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loading = true;

    this._subscriptions.add(
      this.loadingService
        .getLoading$()
        .subscribe((isLoading: boolean): void => {
          this.loading = isLoading;
        })
    );
  }

  ngAfterViewInit(): void {
    setTimeout((): void => {
      this.loading = false;
    }, 3000);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
