import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Canteen } from 'src/app/models/canteen';
import { CanteenService } from 'src/app/services/http/canteen.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.css'],
})
export class CanteenComponent {
  loading!: boolean;
  canteenArr: Canteen[] = [];

  getAllFromCanteenSub!: Subscription;

  constructor(
    private loadingS: LoadingService,
    private canteenS: CanteenService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingS.startLoading();

    this.getAllFromCanteenSub = this.canteenS
      .getAllFromCanteen()
      .subscribe((menu: Canteen[]): void => {
        this.canteenArr = menu;
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
