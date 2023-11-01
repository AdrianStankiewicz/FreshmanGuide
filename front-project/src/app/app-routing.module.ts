import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeModule } from './modules/home/home.module';
import { AttractionsModule } from './modules/attractions/attractions.module';
import { CanteenModule } from './modules/canteen/canteen.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { FindRoomModule } from './modules/find-room/find-room.module';
import { FormalitiesModule } from './modules/formalities/formalities.module';
import { ForumModule } from './modules/forum/forum.module';
import { InternshipModule } from './modules/internship/internship.module';
import { ShopModule } from './modules/shop/shop.module';
import { TeachersModule } from './modules/teachers/teachers.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'atrakcje',
    loadChildren: () =>
      import('./modules/attractions/attractions.module').then(
        (m) => m.AttractionsModule
      ),
  },
  {
    path: 'stolowka',
    loadChildren: () =>
      import('./modules/canteen/canteen.module').then((m) => m.CanteenModule),
  },
  {
    path: 'slownik',
    loadChildren: () =>
      import('./modules/dictionary/dictionary.module').then(
        (m) => m.DictionaryModule
      ),
  },
  {
    path: 'dokumenty',
    loadChildren: () =>
      import('./modules/documents/documents.module').then(
        (m) => m.DocuemntsModule
      ),
  },
  {
    path: 'znajdz-sale',
    loadChildren: () =>
      import('./modules/find-room/find-room.module').then(
        (m) => m.FindRoomModule
      ),
  },
  {
    path: 'sprawy-studenckie',
    loadChildren: () =>
      import('./modules/formalities/formalities.module').then(
        (m) => m.FormalitiesModule
      ),
  },
  {
    path: 'forum',
    loadChildren: () =>
      import('./modules/forum/forum.module').then((m) => m.ForumModule),
  },
  {
    path: 'praktyki',
    loadChildren: () =>
      import('./modules/internship/internship.module').then(
        (m) => m.InternshipModule
      ),
  },
  {
    path: 'sklepik',
    loadChildren: () =>
      import('./modules/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'prowadzacy',
    loadChildren: () =>
      import('./modules/teachers/teachers.module').then(
        (m) => m.TeachersModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HomeModule,
    AttractionsModule,
    CanteenModule,
    DictionaryModule,
    FindRoomModule,
    FormalitiesModule,
    ForumModule,
    InternshipModule,
    ShopModule,
    TeachersModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
