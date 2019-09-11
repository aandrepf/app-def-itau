import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentificacaoComponent } from './components/identificacao/identificacao.component';
import { ModalidadeComponent } from './components/modalidade/modalidade.component';

const routes: Routes = [
  { path: 'identificacao', component: IdentificacaoComponent},
  { path: 'modalidade', component: ModalidadeComponent},
  { path: '', redirectTo: 'identificacao', pathMatch: 'full' },
  { path: '**', redirectTo: 'identificacao' }
]
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
