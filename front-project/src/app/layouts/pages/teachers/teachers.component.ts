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
  professorsArr: Professor[] = [];
  consultationsArr: Consultation[] = [];

  getAllFromProfessorsSub!: Subscription;
  getAllFromConsulatitionsSub!: Subscription;

  constructor(
    private loadingS: LoadingService,
    private professorsS: ProfessorsService,
    private consultationsS: ConsultationsService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingS.startLoading();

    this.getAllFromProfessorsSub = this.professorsS
      .getAllFromProfessors()
      .subscribe((professors: Professor[]): void => {
        this.professorsArr = professors;
      });

    this.getAllFromConsulatitionsSub = this.consultationsS
      .getAllFromConsultations()
      .subscribe((consultations: Consultation[]): void => {
        this.consultationsArr = consultations;
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
