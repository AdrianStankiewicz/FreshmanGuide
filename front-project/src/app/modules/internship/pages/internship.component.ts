import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Internship } from 'src/app/models/internship';
import { InternshipsService } from 'src/app/services/http/internships.service';
import { LoadingService } from 'src/app/services/loading.service';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { CustomPaginator } from 'src/app/custom-paginator-configuration';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class InternshipComponent implements OnInit, AfterViewInit, OnDestroy {
  protected internships: Internship[] = [];
  protected numberOfInternships = 0;
  protected filteredInternships: Internship[] = [];
  protected slicedInternships: Internship[] = [];
  protected pageSize = 3;
  protected searchKeyword = '';

  private searchedInternships: Internship[] = [];
  private selectedCategory: string = '';
  private _subscriptions = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private internshipsService: InternshipsService
  ) {}

  @ViewChild('categorySelectElement') categorySelectElement!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadingService.startLoading();

    this._subscriptions.add(
      this.internshipsService
        .getAllFromInternships()
        .pipe(distinctUntilChanged())
        .subscribe((internships: Internship[]): void => {
          this.internships = internships;
          this.filteredInternships = this.internships;
          this.slicedInternships = this.filteredInternships.slice(
            0,
            this.pageSize
          );
          this.numberOfInternships = this.filteredInternships.length;
        })
    );
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  protected onSearchChange(): void {
    this.searchedInternships = this.filteredInternships;
    this.applyFilters();
  }

  protected onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filteredInternships = this.internships;

    if (this.searchKeyword.trim() !== '') {
      filteredInternships = filteredInternships.filter(
        (internship: Internship): boolean =>
          internship.name
            .toLowerCase()
            .includes(this.searchKeyword.toLowerCase())
      );
    }

    if (this.selectedCategory) {
      filteredInternships = filteredInternships.filter(
        (internship: Internship): boolean => {
          return internship.category
            .normalize()
            .includes(this.selectedCategory);
        }
      );
    }

    this.filteredInternships = filteredInternships;
    this.numberOfInternships = this.filteredInternships.length;
    this.paginator.firstPage();
    this.slicedInternships = this.filteredInternships;
    this.paginator.length = this.numberOfInternships;
    this.paginator.pageSize = this.pageSize;
    this.slicedInternships = this.filteredInternships.slice(0, this.pageSize);
  }

  protected onReset(): void {
    this.searchKeyword = '';
    this.selectedCategory = '';

    this.filteredInternships = this.internships;
    this.filteredInternships.sort(
      (a: Internship, b: Internship): number => a.id - b.id
    );
    this.numberOfInternships = this.filteredInternships.length;

    this.paginator.pageSize = this.pageSize;
    this.slicedInternships = this.filteredInternships.slice(0, this.pageSize);

    this.categorySelectElement.nativeElement.value = '';
  }

  protected onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filteredInternships.length) {
      endIndex = this.filteredInternships.length;
    }
    this.slicedInternships = this.filteredInternships.slice(
      startIndex,
      endIndex
    );
  }

  protected trackByFn(index: number, item: Internship): number {
    return item.id;
  }
}
