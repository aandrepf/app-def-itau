import { UserIdleService } from 'angular-user-idle';
import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';

@Injectable()
export class RoutingState {
  private history = [];
  private current;
  constructor(private router: Router, private _userIdle: UserIdleService){}

  public loadRouting(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(({urlAfterRedirects}: NavigationEnd) => {
      this.history = [...this.history, urlAfterRedirects];
    });
  }

  public getHistory(): string[] {
    this.verifyIdleUser();
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 1] || '/';
  }

  public clearHistory(): string[] {
    return this.history = [];
  }

  verifyIdleUser(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event:any) => {
      this.current = event.url.replace(/(\/)(\w+)?(\/\w+)?/g, '$1$2');
      this._userIdle.stopWatching();
      this._userIdle.stopTimer();
      if(this.current !== '/' && this.current !== '/identificacao' && this.current !== '/print' && this.current !== '/C:/Users~1/AppData/Temp.tmp/app/app.asar/compiled') {
        this._userIdle.startWatching();
        this._userIdle.onTimerStart().subscribe(count => count == null ? void(0) : console.log('contando ', count));
        this._userIdle.onTimeout().subscribe(() => {
          this.router.navigate(['/identificacao']);
        });
      } else {
        this._userIdle.stopWatching();
        this._userIdle.stopTimer();
      }
    });
  }
}
