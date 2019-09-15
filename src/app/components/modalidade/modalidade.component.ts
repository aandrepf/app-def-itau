import { Component, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Global } from "../../app.global";
import { RoutingState } from '../../services/routingState.service';

import { AppComponent } from './../../app.component';
import { Subscription } from "rxjs";
import { InterfaceService } from "../../services/interface.service";

@Component({
  selector: 'modalidade',
  templateUrl: './modalidade.component.html',
})
export class ModalidadeComponent implements OnDestroy {
  private sub: Subscription;
  public page: number;
  public listButtons;

  constructor(private _app: AppComponent, private _state: RoutingState, private _router: Router, private _active: ActivatedRoute,
    private _interface: InterfaceService) {
    if(Global.FLUXO === null || Global.FLUXO === undefined) {
      this._state.clearHistory();
      this._router.navigate(['/']);
    }else {
      this._app.previousRoute = this._state.getHistory();
      console.log('Fluxo depois de recebido o CPF', Global.FLUXO);
      this._app.getLocation();
      this.sub = this._active.params.subscribe(params => {
        if (params['id'] === undefined) {
          this._router.navigate(['/']);
        } else {
          this.page = +params['id'];
          this.montaModalidadeButtons(this.page);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.sub !== undefined) { this.sub.unsubscribe(); }
  }

  public montaModalidadeButtons(pagina: number) {
    this._interface.getInterface(pagina).then(
      (retorno: any[]) => {
        this.listButtons = retorno[0].interfaceEmissorBotao;
    });
  }

  /*
  DIRECIONA PARA TELA DE IMPRESSÃO DE ACORDO COM IdBotao
  SETADO NO ELEMENTO HTML
*/
 public emitSenha(idBotao: number, tipo: number, prioritario: boolean): void {
    if (tipo === 3) {
      Global.FLUXO.isPrioritario = prioritario;
      console.log('Id botão destino : ', idBotao);
      this._router.navigate(['/print', idBotao]);
    }
  }
}
