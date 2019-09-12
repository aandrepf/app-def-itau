import { Component } from "@angular/core";
import { Global } from "../../app.global";
import { RoutingState } from '../../services/routingState.service';
import { NgxSpinnerService } from "ngx-spinner";

import { AppComponent } from '../../app.component';
import { Router } from "@angular/router";

@Component({
  selector: 'segmento',
  templateUrl: './segmento.component.html',
})
export class SegmentoComponent {

  constructor(private _app: AppComponent, private _state: RoutingState, private _router: Router, ) {
    if(Global.FLUXO === null || Global.FLUXO === undefined) {
      this._router.navigate(['/']);
    }else {
      this._app.getLocation();
      this._app.previousRoute = this._state.getHistory();
      console.log('Fluxo depois de selecionada a modalidade', Global.FLUXO);
    }
  }

  public selectSegmento(segmento: string) {
    console.log('segmento selecionado:', segmento);
    this._router.navigate(['/modalidade']);
  }
}
