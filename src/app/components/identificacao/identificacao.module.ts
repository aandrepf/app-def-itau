import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NgxMaskModule, MaskService } from 'ngx-mask';

import { IdentificacaoComponent } from './identificacao.component';
import { NumPadComponent } from './numpad/numpad';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatBottomSheetModule,
    NgxMaskModule,
    NgxSpinnerModule
  ],
  declarations: [
    IdentificacaoComponent,
    NumPadComponent
  ],
  exports: [IdentificacaoComponent],
  providers: [MaskService]
})
export class IdentificacaoModule {}

