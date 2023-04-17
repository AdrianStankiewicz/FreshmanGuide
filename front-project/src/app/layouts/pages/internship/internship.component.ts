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
  internshipsArr: Internship[] = [];

  getAllFromInternshipsSub!: Subscription;

  constructor(
    private loadingS: LoadingService,
    private internshipsS: InternshipsService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingS.startLoading();

    this.getAllFromInternshipsSub = this.internshipsS
      .getAllFromInternships()
      .subscribe((internships: Internship[]): void => {
        this.internshipsArr = internships;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = this.loadingS.stopLoading();
    }, 800);
  }

  ngOnDestroy(): void {
    this.loading = this.loadingS.startLoading();
  }
}
