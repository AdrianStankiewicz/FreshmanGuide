import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryComponent } from 'src/app/modules/dictionary/pages/dictionary.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [DictionaryComponent],
  imports: [CommonModule, DictionaryRoutingModule, MatProgressSpinnerModule],
})
export class DictionaryModule {}
