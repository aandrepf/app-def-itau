import { Subscription } from 'rxjs';
import { InterfaceService } from './services/interface.service';
import { Component, HostListener } from '@angular/core';
import { RoutingState } from './services/routingState.service';
import { Router, NavigationEnd } from '@angular/router';
import { Global } from './app.global';
import { filter } from 'rxjs/operators';
import { UserIdleService } from 'angular-user-idle';
import { interval } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private _subs: Subscription;
  public showInterface: boolean = false;
  public showNavigation: boolean;
  public previousRoute: string[];
  public msg

  constructor(private _state: RoutingState, private _router: Router, private _userIdle: UserIdleService, private _interface: InterfaceService,
    private _spinner: NgxSpinnerService) {
    this.msg = 'carregando interface';
    this.previousRoute = this._state.getHistory();
    this._state.loadRouting();
    console.log('versão', '1.0.0-beta');
    this.showNavigationButton();
    this.getAgenciaCodigo();
  }

  ngOnDestroy(): void {
    if (this._subs !== undefined) { this._subs.unsubscribe(); }
  }

  @HostListener('window:click') windowClick(): void { this._userIdle.resetTimer(); }

  public showNavigationButton() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event:any) => {
      let url = event.url.replace(/(\/)(\w+)?(\/\w+)?/g, '$1$2');
      console.log('url', url);
      if(url === '/' || url === '/identificacao' || url === '/print' || url.indexOf('C:') !== -1) {
        this.showNavigation = false;
      } else {
        this.showNavigation = true;
      }
    });
  }

  public getAgenciaCodigo() {
    this._spinner.show();
    const source = interval(15 * 1000);
    this._subs = source.subscribe(() => {
        if(Global.SLAVE) {
          this._spinner.hide();
          this.showInterface = true;
        } else {
          this._interface.getAgencia()
          .then((agencia: any) => {
            console.log('AGENCIA', agencia);
            if(agencia) {
              this._spinner.hide();
              this.showInterface = true;
            } else{
              this._spinner.show()
              this.showInterface = false;
              setTimeout(() => {
                this._state.clearHistory();
                this._router.navigate(['/identificacao']);
                console.log('Não foi possível retornar o código da agencia');
              }, 500);
            }
          })
          .catch(error => {
            void(error);
          });
        }
      }
    );
  }

  public previousPage() {
    if (Global.FLUXO.crmEncontrado) {
      let previous = this.previousRoute[this.previousRoute.length - 1];
      this._router.navigate([previous]);
    } else {
      this._router.navigate(['/identificacao']);
    }
  }

  public getLocation() {
    setTimeout(()=>{
      this.showNavigationButton();
    },100)
  }
}
