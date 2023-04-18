import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Internship } from 'src/app/models/internship';
import { InternshipsService } from 'src/app/services/http/internships.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css'],
})
export class InternshipComponent {
  loading!: boolean;
  internships: Internship[] = [];

  getAllFromInternshipsSub!: Subscription;

  constructor(
    private loadingService: LoadingService,
    private internshipsService: InternshipsService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();

    this.getAllFromInternshipsSub = this.internshipsService
      .getAllFromInternships()
      .subscribe((internships: Internship[]): void => {
        this.internships = internships;
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
}
