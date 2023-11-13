import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import {
  BuildingsEnum,
  FFloorsEnum,
  FOneRoomsEnum,
  FTwoRoomsEnum,
  FZeroRoomsEnum,
} from '../enums/map-options.enum';
import { FilterHandlerService } from '../services/filters-handler.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-find-room',
  templateUrl: './find-room.component.html',
  styleUrls: ['./find-room.component.css'],
})
export class FindRoomComponent implements OnInit, AfterViewInit, OnDestroy {
  protected buildings: string[] = [];
  protected floors: string[] = [];
  protected rooms: string[] = [];
  protected imageURL = '';
  protected filtersForm!: FormGroup;
  protected selectedRoom!: string;

  private _subscriptions = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private filtersHandlerService: FilterHandlerService
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();

    this.filtersForm = this.filtersHandlerService.getFiltersForm();

    this._subscriptions.add(
      this.filtersForm.controls['building'].valueChanges.subscribe(
        (b: string): void => {
          this.floors = this.getFloorOptions(b);
          this.filtersForm.controls['floor'].setValue('');
          this.filtersForm.controls['room'].setValue('');
        }
      )
    );

    this._subscriptions.add(
      this.filtersForm.controls['floor'].valueChanges.subscribe(
        (f: string): void => {
          this.rooms = this.getRoomOptions(f);
          this.filtersForm.controls['room'].setValue('');
        }
      )
    );

    this._subscriptions.add(
      this.filtersForm.controls['room'].valueChanges.subscribe(
        (room: string): void => {
          this.selectedRoom = room;
        }
      )
    );

    this.buildings = Object.values(BuildingsEnum);
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  ngOnDestroy(): void {
    this.filtersForm.reset();
    this._subscriptions.unsubscribe();
  }

  protected trackByFn(index: number, item: string): string {
    return item;
  }

  private getFloorOptions(building: string): string[] {
    switch (building) {
      case BuildingsEnum.F:
        return Object.values(FFloorsEnum);
        break;
      default:
        return [];
        break;
    }
  }

  private getRoomOptions(floor: string): string[] {
    switch (floor) {
      case FFloorsEnum.ZERO:
        this.imageURL = 'assets/images/map-page/F/parter.png';
        return Object.values(FZeroRoomsEnum);
        break;
      case FFloorsEnum.ONE:
        this.imageURL = 'assets/images/map-page/F/first.png';
        return Object.values(FOneRoomsEnum);
        break;
      case FFloorsEnum.TWO:
        this.imageURL = 'assets/images/map-page/F/second.png';
        return Object.values(FTwoRoomsEnum);
        break;
      default:
        this.imageURL = '';
        return [];
        break;
    }
  }
}
