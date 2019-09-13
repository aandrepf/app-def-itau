import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// rotas
import { routing } from './app.routing';

// components
import { AppComponent } from './app.component';

// modules
import { IdentificacaoModule } from './components/identificacao/identificacao.module';
import { ModalidadeModule } from './components/modalidade/modalidade.module';
import { SegmentoModule } from './components/segmento/segmento.module';
import { PrintModule } from './components/print/print.module';

// services
import { RoutingState } from './services/routingState.service';
import { InterfaceService } from './services/interface.service';

@NgModule({
  declarations:[AppComponent],
  imports: [
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IdentificacaoModule,
    ModalidadeModule,
    SegmentoModule,
    PrintModule
  ],
  providers: [
    RoutingState,
    InterfaceService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
