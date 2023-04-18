import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css'],
})
export class AttractionsComponent {
  loading!: boolean;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();
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
