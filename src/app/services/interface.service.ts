import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from "../app.global";
import { ElectronService } from 'ngx-electron';
import { Observable } from "rxjs";
import { CRM } from "../models/fluxo.model";

const httpOptions = {
headers: new HttpHeaders({
    'Content-Type': 'application/json'
})};

class IpcCom {
  endpoint: string;
  ssl: boolean;
  debug: string;
}

@Injectable()
export class InterfaceService {
    public slave:boolean;
    public retorno: IpcCom = new IpcCom();
    public endpoint: string;
    public protocol: string;

    constructor(private http: HttpClient, private _electron: ElectronService) {
      console.log('rodando electron?', this._electron.isElectronApp);
      if(this._electron.isElectronApp) {
        this.retorno = this._electron.ipcRenderer.sendSync('com', { 'evt': 'startup' });
        this.endpoint = this.retorno.endpoint;
        this.protocol = this.retorno.ssl ? 'https' : 'http';
        console.log('retorno electron', this.retorno);
      } else {
        this.endpoint = 'localhost';
        this.protocol = 'http';
      }
      this.isSlave();
    }

    public isSlave(): Promise<any> {
      const url = `${this.protocol}://${this.endpoint}:8080/call/isSlave`;
      return this.http.post(url, httpOptions).toPromise()
      .then((ret: any) => {
        Global.SLAVE = ret.slave;
        console.log('é slave?', this.slave);
      }).catch((error) => {
        void(error);
        Global.SLAVE = false;
        console.log('é slave?', Global.SLAVE);
      });
    }

    public getUserInfo(cpf: Object): Observable<any> {
      const url = `${this.protocol}://${this.endpoint}:8080/utils/identificaCliente`;
      const body = JSON.stringify(cpf);
      return this.http.post(url, body, httpOptions);
    }

    public getInterface(id: number): Promise<any> {
      const url = `${Global.TELA_DEMANDA_FOLHA}`;
      return this.http.get(url).toPromise()
      .then((res: any) => {
        return res.interfaceEmissorPagina.filter(tela => tela.id === id);
      })
      .catch((error) => {
        console.log('Erro', error);
      });
    }

    public sendMsg(item: Object) {
      if(this.slave) {
        const url = `${this.protocol}://${this.endpoint}:8080/call/sendMsg`;
        const body = JSON.stringify(item);
        return this.http.post(url,body, httpOptions);
      } else {
        const url = `${this.protocol}://${this.endpoint}:8080/atendimento/novaSenha`;
        const body = JSON.stringify(item);
        return this.http.post(url, body, httpOptions);
      }
    }
}
