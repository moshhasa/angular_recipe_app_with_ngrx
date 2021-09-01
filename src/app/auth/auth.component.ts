import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoggedInMode: boolean = true;
  isLoading:boolean = false;
  error: string = null;
  private storeSubscription : Subscription;

  constructor(private store : Store<fromApp.AppState>) { }
 
 
  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe( authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
    });
  }

  onHandleError()
  {
    this.store.dispatch(new AuthActions.ClearError());
  }

  onSwitchMode()
  {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  onSubmit(loginForm : NgForm)
  {
    if(!loginForm.valid)
    {
      return;
    }
    
    const email = loginForm.value.email;
    const password = loginForm.value.password;
   
    if(this.isLoggedInMode)
    { 
     this.store.dispatch( new AuthActions.loginStart({email : email, password : password }));
    }
    else
    {
      this.store.dispatch( new AuthActions.SignupStart({email : email, password : password }));
    }

    loginForm.reset();
  }
}
