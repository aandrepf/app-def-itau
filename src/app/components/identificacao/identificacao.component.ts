import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { ValidateBrService } from 'angular-validate-br';
import { SlideInOutAnimation } from './animation';
import { Pad } from './numpad/numpad';
import { Global } from './../../app.global';
import { RoutingState } from '../../services/routingState.service';
import { Fluxo, CRM } from '../../models/fluxo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserIdleService } from 'angular-user-idle';

class Status {
  status: boolean;
  msg: string;
}

@Component({
  selector: 'identificacao',
  templateUrl: './identificacao.component.html',
  animations: [SlideInOutAnimation]
})
export class IdentificacaoComponent{
  @Input() public valorPad = '';
  public animationState = 'out';
  public previousRoute: string[];
  public crmForm: FormGroup;
  public crmInfo: CRM;
  public crmStatus: Status;

  constructor(private userIdle: UserIdleService, private _state: RoutingState, private _validate: ValidateBrService,private fb: FormBuilder, private _router: Router, private renderer: Renderer2) {
    this.previousRoute = this._state.getHistory();
    Global.FLUXO = new Fluxo(new CRM(), '', '', '', '', null, null, null);
    this.userIdle.stopWatching();
    console.log('Fluxo de entrada', Global.FLUXO);
    this.loadForm();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
   event.returnValue = false;
   event.preventDefault();
  }

  @ViewChild("cpfInput") cpfInput: ElementRef;

  loadForm() {
    this.crmInfo = new CRM();
    this.crmForm = this.fb.group({
      cpf: ['', [Validators.min(11),this._validate.cpf]]
    });
  }

  updateForm() {
    this.crmForm.setValue({
      cpf: this.valorPad
    });
  }

  toggleShowDiv(divName: string) {
    this.updateForm();
    this.animationState = 'out';
    if (divName === 'divA') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }

  recebeValue(valor: Pad) {
    this.valorPad = valor.values.trim().replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

    if(this.crmForm.value.cpf && valor.crm !== undefined) {
      Global.FLUXO.crm.cpf = this.crmForm.value.cpf.replace(/\D/g, '');
      if(valor.crm.status === false) {
        this._router.navigate(['/modalidade', 5]);
        Global.FLUXO.opcao = 'informações';
        Global.FLUXO.crmEncontrado = valor.crm.status;
      } else {
        Global.FLUXO.crm.nome_cliente = valor.crm.nome;
        Global.FLUXO.segmento = valor.crm.segmento;
        Global.FLUXO.situacao = valor.crm.situacao;
        Global.FLUXO.consignado = valor.crm.consignado;
        Global.FLUXO.correntista = valor.crm.correntista;
        Global.FLUXO.crmEncontrado = valor.crm.status;
        if (Global.FLUXO.crmEncontrado && Global.FLUXO.situacao === 'Irregular') {
          Global.FLUXO.opcao = 'informações';
          this._router.navigate(['/modalidade', 5]);
        } else {
          this._router.navigate(['/segmento']);
        }
      }
    }

    this.animationState = valor.animation;
    this.updateForm();
  }

  onKey(ev: any) {
    ev.preventDefault();
  }
}
