import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentificacaoComponent } from './components/identificacao/identificacao.component';
import { ModalidadeComponent } from './components/modalidade/modalidade.component';
import { SegmentoComponent } from './components/segmento/segmento.component';
import { PrintComponent } from './components/print/print.component';

const routes: Routes = [
  { path: 'identificacao', component: IdentificacaoComponent},
  { path: 'modalidade', component: ModalidadeComponent},
  { path: 'segmento', component: SegmentoComponent},
  { path: 'print', component: PrintComponent},
  { path: '', redirectTo: 'identificacao', pathMatch: 'full' },
  { path: '**', redirectTo: 'identificacao' }
]
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
