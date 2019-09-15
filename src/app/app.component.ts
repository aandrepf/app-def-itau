import { Component, HostListener } from '@angular/core';
import { RoutingState } from './services/routingState.service';
import { Router, NavigationEnd } from '@angular/router';
import { Global } from './app.global';
import { filter } from 'rxjs/operators';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public showNavigation: boolean;
  public previousRoute: string[];

  constructor(private _state: RoutingState, private _router: Router, private _userIdle: UserIdleService) {
    this.previousRoute = this._state.getHistory();
    this._state.loadRouting();
    console.log('versão', '1.0.0-beta');
    this.showNavigationButton();
  }

  @HostListener('window:click') windowClick(): void { this._userIdle.resetTimer(); }

  public showNavigationButton() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event:any) => {
      let url = event.url.replace(/(\/)(\w+)?(\/\w+)?/g, '$1$2');
      if(url === '/' || url === '/identificacao' || url === '/print') {
        this.showNavigation = false;
      } else {
        this.showNavigation = true;
      }
    });
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
