import { Component } from '@angular/core';
import { RoutingState } from './services/routingState.service';
import { Router } from '@angular/router';

@Component({
  selector: 'root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public showNavigation: boolean;
  public previousRoute: string[];

  constructor(private _state: RoutingState, private _router: Router) {
    this.previousRoute = this._state.getHistory();
    this._state.loadRouting();
    console.log('versão', '1.0.0');
    this.showNavigationButton(sessionStorage.getItem('location'));
  }

  public previousPage() {
    let previous = this.previousRoute[this.previousRoute.length - 1];
    this._router.navigate([previous]);
    if(previous === '/identificacao') {
      this.showNavigation = false;
    }
  }

  public getLocation() {
    setTimeout(()=>{
      this.showNavigationButton(sessionStorage.getItem('location'));
    },100)
  }

  public showNavigationButton(location) {
    if(location === '/' || location === '/identificacao' || location === '/print') {
      this.showNavigation = false;
    } else {
      this.showNavigation = true;
    }
  }
}
