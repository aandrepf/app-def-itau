import { Component, EventEmitter, Output, OnInit, Input, SimpleChange } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Global } from './../../../app.global';
import { NgxSpinnerService } from 'ngx-spinner';
import { InterfaceService } from '../../../services/interface.service';
import { CRM } from '../../../models/fluxo.model';

export class Pad {
  values: string;
  animation: string;
  crm: CRM;
}

@Component({
  selector: 'numpad',
  templateUrl: './numpad.html'
})
export class NumPadComponent implements OnInit {
  @Output() numValue: EventEmitter<Pad> = new EventEmitter();
  @Output() msgErroContinua: EventEmitter<string> = new EventEmitter();
  @Input() validado:boolean;

  public values = '';
  public disabled:boolean;
  public cadastro;

  constructor(private route: Router, private _spinner: NgxSpinnerService, private _interface: InterfaceService) {
    this.disabled = true;
    this.cadastro = new CRM();
  }

  ngOnInit() { localStorage.clear(); }
  ngOnChanges(): void {
    this.disabled = !this.validado && this.values.length === 11 ? false : true;
  }

  fecharPad() {
    const dado = this.values;
    const padValues = new Pad();

    if (dado.length === 0) {
      this.values = '';
      padValues.values = this.values;
      padValues.animation = 'out';
      this.numValue.emit(padValues);
      localStorage.clear();
      // this.msgErroContinua.emit('Campo não pode ser vazio!');

    } else if (dado.length > 0 && dado.length < 11) {
      this.values = '';
      padValues.values = this.values;
      padValues.animation = 'out';
      this.numValue.emit(padValues);
      localStorage.clear();
      // this.msgErroContinua.emit('Número de telefone inválido!');

    } else {
      this._spinner.show();
      padValues.values = dado;
      padValues.animation = 'out';
      this._interface.getUserInfo({ cpf: padValues.values } ).subscribe(
        (retorno: any) => {
          this.cadastro = retorno;
          padValues.crm = this.cadastro;
        },
        (error) => void(error),
        () => {

          if(padValues.crm.status) {
            this._spinner.hide();
            this.numValue.emit(padValues);
          } else {
            this._spinner.hide();
            this.values = '';
            padValues.values = this.values;
            padValues.animation = 'in';
            padValues.crm = this.cadastro;
            this.numValue.emit(padValues);
          }
        });
    }
  }

  goBack() {
    const padValues = new Pad();
    padValues.values = '';
    padValues.animation = 'out';
    this.route.navigate(['/']);
  }

  addValue(valor: string) {
    this.values += valor;
    if (this.values.length > 11) {
      this.values = this.values.substring(0, this.values.length - 1);
    }
    const padValues = new Pad();
    padValues.values = this.values.substring(0, 11);
    padValues.animation = 'in';
    this.numValue.emit(padValues);
  }

  apagaValor() {
    this.values = this.values.substring(0, this.values.length - 1);
    const padValues = new Pad();
    padValues.values = this.values;
    padValues.animation = 'in';
    this.numValue.emit(padValues);
  }
}
