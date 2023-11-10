import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { Constants } from 'src/app/constants';
import { LoadingService } from 'src/app/services/loading.service';

interface Admin {
  id: number;
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = this.fb.nonNullable.group({
      login: new FormControl<string>('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  getLoginForm(): FormGroup {
    return this.loginForm;
  }

  validateLoginForm(loginForm: FormGroup): void {
    loginForm.markAllAsTouched();
    loginForm.updateValueAndValidity();
  }

  submit(loginForm: FormGroup): void {
    this.getAdmin().subscribe((admin: Admin): void => {
      const isAdmin = this.checkIfAdmin(loginForm, admin);

      if (isAdmin) {
        const token = this.generateFakeToken(true);
        localStorage.setItem('freshmanGuideJWT', token);
        this.toastr.success('Pomyślnie zalogowano');
        this.router.navigateByUrl('/admin');
      } else {
        this.toastr.error('Dane są nieprawidłowe');
      }

      loginForm.reset();
      this.loadingService.stopLoading();
    });
  }

  private getAdmin(): Observable<Admin> {
    return this.http
      .get<Admin>(`${Constants.backendApiUrl}/Main/GetAdmin/1`)
      .pipe(take(1));
  }

  private checkIfAdmin(loginForm: FormGroup, admin: Admin): boolean {
    const credentials = loginForm.getRawValue();
    if (
      credentials.login === admin.login &&
      credentials.password === admin.password
    ) {
      return true;
    } else {
      return false;
    }
  }

  private generateFakeToken(isAdmin: boolean): string {
    const data = {
      isAdmin,
      timestamp: Date.now(),
    };
    const token = btoa(JSON.stringify(data));
    return token;
  }
}
