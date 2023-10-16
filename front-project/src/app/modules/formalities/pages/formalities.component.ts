import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-formalities',
  templateUrl: './formalities.component.html',
  styleUrls: ['./formalities.component.css'],
})
export class FormalitiesComponent implements OnInit, AfterViewInit {
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.startLoading();
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }
}
