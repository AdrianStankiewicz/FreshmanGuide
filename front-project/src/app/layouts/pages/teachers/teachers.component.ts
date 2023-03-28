import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent {
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
