import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take, tap } from 'rxjs';
import { Internship, UpdateInternship } from 'src/app/models/internship';
import { InternshipsService } from 'src/app/services/http/internships.service';
import { LoadingService } from 'src/app/services/loading.service';
import { EditInternFormService } from '../../services/edit-intern-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-single-internship',
  templateUrl: './edit-single-internship.component.html',
  styleUrls: ['./edit-single-internship.component.css'],
})
export class EditSingleInternshipComponent implements OnInit, AfterViewInit {
  protected editForm!: FormGroup;
  protected spinnerVal!: boolean;
  protected internID!: number;
  protected internData!: Internship;

  private _subscriptions = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private internshipsApiService: InternshipsService,
    private route: ActivatedRoute,
    private editInternFormService: EditInternFormService
  ) {}

  ngOnInit(): void {
    this.loadingService.stopLoading();
    this.spinnerVal = true;
    this.internID = this.route.snapshot.params['id'];

    this.editForm = this.editInternFormService.getEditInternForm();

    this._subscriptions.add(
      this.internshipsApiService
        .getOneFromInternships(this.internID)
        .pipe(
          take(1),
          tap((response): void => {
            this.internData = response;

            this.editForm.patchValue({
              name: this.internData.name,
              link: this.internData.link,
              category: this.internData.category,
              faculty: this.internData.faculty,
            });
          })
        )
        .subscribe((): void => {
          this.spinnerVal = false;
        })
    );
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.editInternFormService.destroy();
  }

  protected submit(): void {
    const newInternship: UpdateInternship = {
      name: this.editForm.value.name,
      link: this.editForm.value.link,
      category: this.editForm.value.category,
      faculty: this.editForm.value.faculty,
    };

    console.log(newInternship);

    this.editInternFormService.submit(this.internID, newInternship);
  }

  protected delete(): void {
    this.editInternFormService.delete(this.internID);
  }
}
