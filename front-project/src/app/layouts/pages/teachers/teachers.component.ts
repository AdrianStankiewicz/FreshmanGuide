import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Consultation } from 'src/app/models/consultation';
import { Professor } from 'src/app/models/professor';
import { ConsultationsService } from 'src/app/services/http/consultations.service';
import { ProfessorsService } from 'src/app/services/http/professors.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent {
  loading!: boolean;
  professors: Professor[] = [];
  consultations: Consultation[] = [];

  getAllFromProfessorsSub!: Subscription;
  getAllFromConsulatitionsSub!: Subscription;

  constructor(
    private loadingService: LoadingService,
    private professorsService: ProfessorsService,
    private consultationsService: ConsultationsService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingService.startLoading();

    this.getAllFromProfessorsSub = this.professorsService
      .getAllFromProfessors()
      .subscribe((professors: Professor[]): void => {
        this.professors = professors;
      });

    this.getAllFromConsulatitionsSub = this.consultationsService
      .getAllFromConsultations()
      .subscribe((consultations: Consultation[]): void => {
        this.consultations = consultations;
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
