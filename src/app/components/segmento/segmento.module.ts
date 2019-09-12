import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentoComponent } from './segmento.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SegmentoComponent
  ],
  exports: [SegmentoComponent],
  providers: []
})
export class SegmentoModule {}
