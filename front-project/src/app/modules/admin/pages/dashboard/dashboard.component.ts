import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();
  }

  ngAfterViewInit(): void {
    this.loadingService.stopLoading();
  }

  protected toForum(): void {
    this.router.navigateByUrl('/admin/forum');
  }

  protected toInternships(): void {
    this.router.navigateByUrl('/admin/praktyki');
  }

  protected logout(): void {
    localStorage.removeItem('freshmanGuideJWT');
    this.toastr.success('Pomyślnie wylogowano');
    this.router.navigateByUrl('/admin/zaloguj');
  }
}
