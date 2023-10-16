import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css'],
})
export class AttractionsComponent implements OnInit, AfterViewInit {
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.startLoading();
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }
}
