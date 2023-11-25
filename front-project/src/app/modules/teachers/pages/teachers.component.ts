import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { Professor } from 'src/app/models/professor';
import { LoadingService } from 'src/app/services/loading.service';
import { ProfessorsService } from 'src/app/services/http/professors.service';
import { OrganisationGroupPipe } from './organisation-group.pipe';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
  providers: [OrganisationGroupPipe]
})
export class TeachersComponent implements OnInit, AfterViewInit, OnDestroy {
  protected profesors: Professor[] = [];

  private _subscriptions = new Subscription();

  groupByOrganisation(profesors: any[]): any[] {
    return this.organisationGroupPipe.transform(profesors);
  }

  constructor(
    private loadingService: LoadingService,
    private professorsService: ProfessorsService,
    private organisationGroupPipe: OrganisationGroupPipe
) {}

  ngOnInit(): void {
    this.loadingService.startLoading();

    this._subscriptions.add(
      this.professorsService
        .getAllFromProfessors()
        .pipe(distinctUntilChanged())
        .subscribe((profesors: Professor[]): void => {
          this.profesors = profesors;
        })
    );
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
