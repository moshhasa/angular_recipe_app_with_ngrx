import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as AuthActions from './auth/store/auth.action';
import * as fromApp  from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  constructor(private authService: AuthService, 
    private store : Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId){}
  
  ngOnInit(): void {
    if( isPlatformBrowser(this.platformId)) // only for angular universal
    {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    // this.authService.autoLogin();
  }
}
