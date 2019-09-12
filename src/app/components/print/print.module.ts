import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintComponent } from './print.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PrintComponent
  ],
  exports: [PrintComponent],
  providers: []
})
export class PrintModule {}
