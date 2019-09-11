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

// services
import { RoutingState } from './services/routingState.service';

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
    ModalidadeModule
  ],
  providers: [
    RoutingState,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
