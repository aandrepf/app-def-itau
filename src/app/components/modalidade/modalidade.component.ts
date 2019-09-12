import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Global } from "../../app.global";
import { RoutingState } from '../../services/routingState.service';

import { AppComponent } from './../../app.component';

@Component({
  selector: 'modalidade',
  templateUrl: './modalidade.component.html',
})
export class ModalidadeComponent {

  constructor(private _app: AppComponent, private _state: RoutingState, private _router: Router) {
    if(Global.FLUXO === null || Global.FLUXO === undefined) {
      this._router.navigate(['/']);
    }else {
      this._app.previousRoute = this._state.getHistory();
      console.log('Fluxo depois de recebido o CPF', Global.FLUXO);
      this._app.getLocation();
    }
  }

  public selectModalidade(modalidade: string) {
    console.log('modalidade selecionada:', modalidade);
    this._router.navigate(['/print']);
  }
}
