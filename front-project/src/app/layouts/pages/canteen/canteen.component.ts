import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.css']
})
export class CanteenComponent {
  loading!: boolean;

  constructor(private loadingS: LoadingService) {}

  ngOnInit(): void {
    this.loading = this.loadingS.startLoading();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.loading = this.loadingS.stopLoading();
    }, 800);
  }

  ngOnDestroy(): void {
    this.loading = this.loadingS.startLoading();
  }
}
