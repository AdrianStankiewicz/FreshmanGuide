import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit, AfterViewInit {
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.startLoading();
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }
}
