import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Canteen } from 'src/app/models/Canteen';
import { CanteenService } from 'src/app/services/http/canteen.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.css'],
})
export class CanteenComponent {
  loading!: boolean;
  dishes: Canteen[] = [];

  getAllFromCanteenSub!: Subscription;

  constructor(
    private loadingService: LoadingService,
    private canteenService: CanteenService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();

    this.getAllFromCanteenSub = this.canteenService
      .getAllFromCanteen()
      .subscribe((dishes: Canteen[]): void => {
        this.dishes = dishes;
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
