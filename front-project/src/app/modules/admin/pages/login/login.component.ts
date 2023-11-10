import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  protected loginForm!: FormGroup;

  constructor(
    private loadingService: LoadingService,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();

    this.loginForm = this.loginService.getLoginForm();
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  protected submit(): void {
    this.loadingService.startLoading();
    this.loginService.validateLoginForm(this.loginForm);
    if (this.loginForm.invalid) {
      this.toastr.error('Dane są nieprawidłowe');
      this.loadingService.stopLoading();
      return;
    }

    this.loginService.submit(this.loginForm);
  }
}
