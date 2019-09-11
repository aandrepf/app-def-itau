import { Component, Input, OnInit } from '@angular/core';
import { SlideInOutAnimation } from './animation';
import { Pad } from './numpad/numpad';
import { Global } from './../../app.global';
import { RoutingState } from '../../services/routingState.service';
import { Fluxo, CRM } from '../../models/fluxo.model';

@Component({
  selector: 'identificacao',
  templateUrl: './identificacao.component.html',
  animations: [SlideInOutAnimation]
})
export class IdentificacaoComponent {
  @Input() public valorPad = '';
  public animationState = 'out';
  public previousRoute: string[];

  constructor(private _state: RoutingState) {
    this.previousRoute = this._state.getHistory();
    Global.FLUXO = new Fluxo(new CRM(), '', '', null, null);
    console.log('Fluxo de entrada', Global.FLUXO);
  }

  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }

  recebeValue(valor: Pad) {
    this.valorPad = valor.values.trim().replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
    Global.FLUXO.crm.cpf = valor.values;
    this.animationState = valor.animation;
  }

  onKey(ev: any) {
    ev.preventDefault();
  }
}
