import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Global } from "../../app.global";
import { RoutingState } from '../../services/routingState.service';

import { AppComponent } from './../../app.component';

@Component({
    selector: 'print',
    templateUrl: './print.component.html',
  })
  export class PrintComponent {
      constructor(private _app: AppComponent, private _state: RoutingState, private _router: Router) {
        if(Global.FLUXO === null || Global.FLUXO === undefined) {
            this._router.navigate(['/']);
          }else {
            this._app.previousRoute = this._state.getHistory();
            console.log('Fluxo depois selecionado segmento', Global.FLUXO);
            // this._app.showNavigationButton();
          }
      }
  }
