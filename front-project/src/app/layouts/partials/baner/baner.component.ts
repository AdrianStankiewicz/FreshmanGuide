import { Component, DoCheck, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, distinctUntilChanged, filter } from 'rxjs';
import { Event } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-baner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './baner.component.html',
  styleUrls: ['./baner.component.css'],
})
export class BanerComponent implements DoCheck, OnDestroy {
  protected banerTitle!: string;
  protected banerText!: string;
  private _subscriptions = new Subscription();

  private banerTextHome: string = 'Kilka powodów dlaczego warto studiować';
  private banerTitleHome: string = 'Dlaczego warto studiować?';
  private banerImageHome: string = `url('/assets/images/umg1.jpeg')`;
  private banerTitleAttractions: string = 'Atrakcje w Gdyni';
  private banerTextAttractions: string =
    'Kilka pomysłów na spędzenie wolnego czasu';
  private banerImageAttractions: string = `url('/assets/images/attractions1.jpeg')`;
  private banerTitleteachers: string = 'Prowadzący';
  private banerTextteachers: string =
    'Informacje o prowadzących pracujących na naszej uczelni';
  private banerImageteachers: string = `url('/assets/images/teacher1.jpeg')`;
  private banerTitleMap: string = 'Znajdź salę';
  private banerTextMap: string =
    'Sprawdź, w którym miejscu znajduje się sala, której szukasz';
  private banerImageMap: string = `url('/assets/images/map1.jpeg')`;
  private banerTitleFormalities: string = 'Sprawy studenckie';
  private banerTextFormalities: string =
    'Przeczytaj informacje na temat formalności i kół naukowych';
  private banerImageFormalities: string = `url('/assets/images/students1.jpeg')`;
  private banerTitleDictionary: string = 'Słownik studenckiego slangu';
  private banerTextDictionary: string =
    'Znajdziesz tu pojęcia, którymi posługują się starsi studenci';
  private banerImageDictionary: string = `url('/assets/images/dictionary1.jpeg')`;
  private banerTitleCanteen: string = 'Menu uczelnianej stołówki';
  private banerTextCanteen: string =
    'Sprawdź co możesz zjeść na uczelnianej stołówce';
  private banerImageCanteen: string = `url('/assets/images/canteen1.jpeg')`;
  private banerTitleInternship: string = 'Lista praktyk';
  private banerTextInternship: string =
    'Znajdziesz tu praktyki polecane przez starszych studentów';
  private banerImageInternship: string = `url('/assets/images/internship1.jpeg')`;
  private banerTitleShop: string = 'Sklepik UMG';
  private banerTextShop: string =
    'Sprawdź co możesz kupić w uczelnianym sklepiku';
  private banerImageShop: string = `url('/assets/images/shop1.jpeg')`;
  private banerTitleForum: string = 'Forum';
  private banerTextForum: string = 'Zadaj pytanie starszym studentom';
  private banerImageForum: string = `url('/assets/images/forum1.jpeg')`;

  @ViewChild('banerImage') banerImage!: ElementRef;

  constructor(private router: Router) {}

  ngDoCheck(): void {
    this._subscriptions.add(
      this.router.events
        .pipe(
          filter((event: Event): boolean => event instanceof NavigationEnd),
          distinctUntilChanged()
        )
        .subscribe((event: Event): void => {
          const navigationEndEvent = event as NavigationEnd;

          switch (navigationEndEvent.url) {
            case '/atrakcje':
              this.banerImage.nativeElement.style.backgroundImage =
                this.banerImageAttractions;
              this.banerTitle = this.banerTitleAttractions;
              this.banerText = this.banerTextAttractions;
              break;
            case '/prowadzacy':
              this.banerImage.nativeElement.style.backgroundImage =
                this.banerImageteachers;
              this.banerTitle = this.banerTitleteachers;
              this.banerText = this.banerTextteachers;
              break;
            case '/znajdz-sale':
              this.banerImage.nativeElement.style.backgroundImage =
                this.banerImageMap;
              this.banerTitle = this.banerTitleMap;
              this.banerText = this.banerTextMap;
              break;
            case '/sprawy-studenckie':
              this.banerImage.nativeElement.style.backgroundImage =
                this.banerImageFormalities;
              this.banerTitle = this.banerTitleFormalities;
              this.banerText = this.banerTextFormalities;
              break;
            case '/slownik':
              this.banerImage.nativeElement.style.backgroundImage =
                this.banerImageDictionary;
              this.banerTitle = this.banerTitleDictionary;
              this.banerText = this.banerTextDictionary;
              break;
            case '/stolowka':
              this.banerImage.nativeElement.style.backgroundImage =
                this.banerImageCanteen;
              this.banerTitle = this.banerTitleCanteen;
              this.banerText = this.banerTextCanteen;
              break;
            case '/praktyki':
              this.banerImage.nativeElement.style.backgroundImage =
                this.banerImageInternship;
              this.banerTitle = this.banerTitleInternship;
              this.banerText = this.banerTextInternship;
              break;
            case '/sklepik':
              this.banerImage.nativeElement.style.backgroundImage =
                this.banerImageShop;
              this.banerTitle = this.banerTitleShop;
              this.banerText = this.banerTextShop;
              break;
            case '/forum':
              this.banerImage.nativeElement.style.backgroundImage =
                this.banerImageForum;
              this.banerTitle = this.banerTitleForum;
              this.banerText = this.banerTextForum;
              break;
            default:
              this.banerImage.nativeElement.style.backgroundImage =
                this.banerImageHome;
              this.banerTitle = this.banerTitleHome;
              this.banerText = this.banerTextHome;
              break;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
