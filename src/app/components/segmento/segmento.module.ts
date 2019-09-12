import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentoComponent } from './segmento.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  declarations: [
    SegmentoComponent
  ],
  exports: [SegmentoComponent],
  providers: []
})
export class SegmentoModule {}
