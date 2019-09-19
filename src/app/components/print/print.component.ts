import { Fluxo } from './../../models/fluxo.model';
import { Subscription } from 'rxjs';
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Global } from "../../app.global";
import { RoutingState } from '../../services/routingState.service';

import { AppComponent } from './../../app.component';
import { InterfaceService } from '../../services/interface.service';
import { CRM } from '../../models/fluxo.model';
import { NgxSpinnerService } from 'ngx-spinner';

class Send {
  btnId: number;
  categoriaId: number;
  message: string;
  imprimirTicket: boolean;
  tipo: string;
  crm: CRM;
}

@Component({
    selector: 'print',
    templateUrl: './print.component.html',
  })
  export class PrintComponent {
    private sub: Subscription;

    public senha = false;
    public error = false;

    public opcao: string;
    public valorSenha: string;
    public prioritario: boolean;

    constructor(private _app: AppComponent, private _state: RoutingState, private _router: Router, private _active: ActivatedRoute,
      private _interface: InterfaceService, private _spinner: NgxSpinnerService) {
      if(Global.FLUXO === null || Global.FLUXO === undefined) {
        this._router.navigate(['/']);
      }else {
        this._app.previousRoute = this._state.getHistory();
        console.log('Fluxo depois selecionado segmento', Global.FLUXO);
        this.prioritario = Global.FLUXO.isPrioritario;
        this.opcao = Global.FLUXO.opcao;
        this._app.getLocation();
        this.sub = this._active.params.subscribe(params => {
          console.log('parametros impressão', params['id']);
          this._spinner.show();
          setTimeout(() => {
            this.sendMsg(params['id']);
          }, 100);
        });
      }
    }

    public sendMsg(id: number) {
      let send = new Send();
      send.categoriaId = id;
      send.btnId = id;
      send.imprimirTicket = !Global.SLAVE;
      //send.categoriaId = 32;
      //send.btnId = 1;
      send.crm = Global.FLUXO.crm;
      console.log('send', send);
      this._interface.sendMsg(send).subscribe(
      (printinfo: any) => {
        console.log('retorno impressão', printinfo);
        if(Global.SLAVE) {
          let print = printinfo.retorno;
          if(print.error) {
            this._spinner.hide();
            this.error = true;
            setTimeout(() => {
              this._state.clearHistory();
              this._router.navigate(['/identificacao']); }, 3000);
          } else if (print.ticket) {
            this.valorSenha = print.ticket;
            console.log('senha', this.valorSenha);
            if(this.valorSenha === undefined || this.valorSenha === null) {
              this._spinner.hide();
              this.error = true;
              setTimeout(() => {
                this._state.clearHistory();
                this._router.navigate(['/identificacao']); }, 3000);
            } else {
              this._spinner.hide();
              this.senha = true;
              setTimeout(() => {
                this._state.clearHistory();
                this._router.navigate(['/identificacao']); }, 3000);
            }
          }
        } else {
          let print = printinfo;
          if(print.error) {
            this._spinner.hide();
            this.error = true;
            setTimeout(() => {
              this._state.clearHistory();
              this._router.navigate(['/identificacao']); }, 3000);
          } else if (print.ticket) {
            this.valorSenha = print.ticket;
            console.log('senha', this.valorSenha);
            if(this.valorSenha === undefined || this.valorSenha === null) {
              this._spinner.hide();
              this.error = true;
              setTimeout(() => {
                this._state.clearHistory();
                this._router.navigate(['/identificacao']); }, 3000);
            } else {
              this._spinner.hide();
              this.senha = true;
              setTimeout(() => {
                this._state.clearHistory();
                this._router.navigate(['/identificacao']); }, 3000);
            }
          }
        }
      },
      error => {
        this._spinner.hide();
        this.error = true;
        setTimeout(() => {
          this._state.clearHistory();
          this._router.navigate(['/identificacao']); }, 3000);
      });
    }
  }
