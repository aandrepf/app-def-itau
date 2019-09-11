import { Component } from "@angular/core";
import { Global } from "../../app.global";
import { RoutingState } from '../../services/routingState.service';

import { AppComponent } from './../../app.component';
import { Router } from "@angular/router";

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
      this._app.showNavigationButton();
    }
  }
}
