import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-find-room',
  templateUrl: './find-room.component.html',
  styleUrls: ['./find-room.component.css'],
})
export class FindRoomComponent implements OnInit, AfterViewInit {
  protected dishes = [{ name: 'Test1', review: 'Test1' }];

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.startLoading();
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  protected trackByFn(
    index: number,
    item: { name: string; review: string }
  ): string {
    return item.name;
  }
}
