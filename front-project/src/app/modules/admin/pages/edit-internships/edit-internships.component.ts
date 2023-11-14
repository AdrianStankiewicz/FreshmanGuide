import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { CustomPaginator } from 'src/app/custom-paginator-configuration';
import { Internship } from 'src/app/models/internship';
import { InternshipsService } from 'src/app/services/http/internships.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-edit-internships',
  templateUrl: './edit-internships.component.html',
  styleUrls: ['./edit-internships.component.css'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class EditInternshipsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  protected internships: Internship[] = [];
  protected numberOfInternships = 0;
  protected filteredInternships: Internship[] = [];
  protected slicedInternships: Internship[] = [];
  protected pageSize = 3;
  private _subscriptions = new Subscription();

  //searchbar
  protected searchKeyword = '';
  private searchedInternships: Internship[] = [];

  //selectCategory
  private selectedCategory: string = '';

  //selectFaculty
  private selectedFaculty: string = '';

  constructor(
    private loadingService: LoadingService,
    private internshipsService: InternshipsService,
    private router: Router
  ) {}

  @ViewChild('categorySelectElement') categorySelectElement!: ElementRef;
  @ViewChild('facultySelectElement') facultySelectElement!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadingService.startLoading();

    this._subscriptions.add(
      this.internshipsService
        .getAllFromInternships()
        .pipe(distinctUntilChanged())
        .subscribe({
          next: (internships: Internship[]): void => {
            this.internships = internships;
            this.filteredInternships = this.internships;
            this.slicedInternships = this.filteredInternships.slice(
              0,
              this.pageSize
            );
            this.numberOfInternships = this.filteredInternships.length;
            this.categorySelectElement.nativeElement.value = '';
            this.facultySelectElement.nativeElement.value = '';
            this.loadingService.stopLoading();
          },
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

  protected onFacultyChange(event: any): void {
    this.selectedFaculty = event.target.value;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filteredInternships = this.internships;

    if (this.searchKeyword.trim() !== '') {
      filteredInternships = filteredInternships.filter((internship): boolean =>
        internship.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }

    if (this.selectedCategory) {
      filteredInternships = filteredInternships.filter(
        (internship: Internship): boolean => {
          return internship.category === this.selectedCategory;
        }
      );
    }

    if (this.selectedFaculty) {
      filteredInternships = filteredInternships.filter(
        (internship: Internship): boolean => {
          return internship.faculty === this.selectedFaculty;
        }
      );
    }

    this.filteredInternships = filteredInternships;
    this.numberOfInternships = this.filteredInternships.length;
    this.slicedInternships = this.filteredInternships;
    if (this.paginator) {
      this.paginator.firstPage();
      this.paginator.length = this.numberOfInternships;
      this.paginator.pageSize = this.pageSize;
    }
    this.slicedInternships = this.filteredInternships.slice(0, this.pageSize);
  }

  protected onReset(): void {
    this.searchKeyword = '';
    this.selectedCategory = '';
    this.selectedFaculty = '';

    this.filteredInternships = this.internships;
    this.filteredInternships.sort(
      (a: Internship, b: Internship): number => a.id - b.id
    );
    this.numberOfInternships = this.filteredInternships.length;

    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
    }
    this.slicedInternships = this.filteredInternships.slice(0, this.pageSize);

    this.categorySelectElement.nativeElement.value = '';
    this.facultySelectElement.nativeElement.value = '';
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

  protected editInternship(internshipID: number): void {
    this.router.navigateByUrl(`/admin/praktyki/${internshipID}`);
  }
}
