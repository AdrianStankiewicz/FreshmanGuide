import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Canteen } from 'src/app/models/canteen';
import { CanteenService } from 'src/app/services/http/canteen.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.css'],
})
export class CanteenComponent implements OnInit, AfterViewInit, OnDestroy {
  protected dishes: Canteen[] = [];

  private _subscriptions = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private canteenService: CanteenService
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();

    this._subscriptions.add(
      this.canteenService
        .getAllFromCanteen()
        .pipe(distinctUntilChanged())
        .subscribe((dishes: Canteen[]): void => {
          this.dishes = dishes;
        })
    );
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
