import { Fluxo } from './../../models/fluxo.model';
import { Component } from "@angular/core";
import { Global } from "../../app.global";
import { RoutingState } from '../../services/routingState.service';
import { NgxSpinnerService } from "ngx-spinner";

import { AppComponent } from '../../app.component';
import { Router } from "@angular/router";
import { InterfaceService } from "../../services/interface.service";

@Component({
  selector: 'segmento',
  templateUrl: './segmento.component.html',
})
export class SegmentoComponent {
  public flSegmento: Fluxo;
  public listLink = [];

  constructor(private _app: AppComponent, private _state: RoutingState, private _router: Router, private _interface: InterfaceService) {
    if(Global.FLUXO === null || Global.FLUXO === undefined) {
      this._state.clearHistory();
      this._router.navigate(['/']);
    }else {
      this._app.getLocation();
      this._app.previousRoute = this._state.getHistory();
      console.log('Fluxo depois de selecionada a modalidade', Global.FLUXO);
      this.flSegmento = Global.FLUXO;
      this.montaInterface();
    }
  }

  public navigate(destino: number, descricao: string) {
    Global.FLUXO.opcao = descricao.indexOf('conta') !== -1 ? 'abrir uma conta' : descricao;
    this._router.navigate(['/modalidade', destino]);
  }

  public montaInterface() {
    let linkNotAbertura = [];
    this._interface.getInterface(1).then(
      (retorno: any[]) => {
        let linkAbertura = retorno[0].interfaceEmissorLink.filter(item => {
          if (item.descr.indexOf(this.flSegmento.segmento) !== -1) {
            return item;
          }
        })[0];
        linkNotAbertura = retorno[0].interfaceEmissorLink.filter(item => {
          if (item.descr.indexOf('conta') === -1) {
            return item;
          }
        });

        linkNotAbertura.forEach(item => {
          this.listLink.push(item);
        })

        this.listLink.unshift(linkAbertura);
    });
  }
}
