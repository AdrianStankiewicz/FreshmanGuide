import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent {
  loading!: boolean;

  constructor(private loadingS: LoadingService) {}

  ngOnInit(): void {
    this.loading = this.loadingS.startLoading();
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
