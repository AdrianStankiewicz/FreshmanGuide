import { Component, ElementRef, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
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
export class InternshipComponent {
  loading!: boolean;
  internships: Internship[] = [];
  numberOfInternships: number = 0;
  filteredInternships: Internship[] = [];
  slicedInternships: Internship[] = [];
  pageSize: number = 3;

  paginatorText!: any;

  searchKeyword: string = '';
  searchedInternships: Internship[] = [];

  internshipCategory!: Internship | undefined;
  selectedCategory: string = '';

  getAllFromInternshipsSub!: Subscription;

  constructor(
    private loadingService: LoadingService,
    private internshipsService: InternshipsService
  ) {}

  @ViewChild('categorySelectElement') categorySelectElement!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();
    window.scrollTo(0, 0);

    this.getAllFromInternshipsSub = this.internshipsService
      .getAllFromInternships()
      .subscribe((internships: Internship[]): void => {
        this.internships = internships;
        this.filteredInternships = this.internships;
        this.slicedInternships = this.filteredInternships.slice(0, this.pageSize);
        this.numberOfInternships = this.filteredInternships.length;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = this.loadingService.stopLoading();
    }, 800);
  }

  ngOnDestroy(): void {
    this.loading = this.loadingService.startLoading();
  }

  onSearchChange(): void {
    this.searchedInternships = this.filteredInternships;
    this.applyFilters();
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredInternships: Internship[] = this.internships;

    if (this.searchKeyword.trim() !== '') {
      filteredInternships = filteredInternships.filter((internship): boolean =>
      internship.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }

    if (this.selectedCategory) {
      filteredInternships = filteredInternships.filter((internship: Internship): boolean => {
        return internship.category.normalize().includes(this.selectedCategory);
      });
    }

    this.filteredInternships = filteredInternships;
    this.numberOfInternships = this.filteredInternships.length;
    this.paginator.firstPage();
    this.slicedInternships = this.filteredInternships;
    this.paginator.length = this.numberOfInternships;
    this.paginator.pageSize = this.pageSize;
    this.slicedInternships = this.filteredInternships.slice(0, this.pageSize);
  }

  onReset(): void {
    this.searchKeyword = '';
    this.selectedCategory = '';

    this.filteredInternships = this.internships;
    this.filteredInternships.sort((a: Internship, b: Internship): number => a.id - b.id);
    this.numberOfInternships = this.filteredInternships.length;

    this.paginator.pageSize = this.pageSize;
    this.slicedInternships = this.filteredInternships.slice(0, this.pageSize);

    this.categorySelectElement.nativeElement.value = '';
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filteredInternships.length) {
      endIndex = this.filteredInternships.length;
    }
    this.slicedInternships = this.filteredInternships.slice(startIndex, endIndex);
  }
}
