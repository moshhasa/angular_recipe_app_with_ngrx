import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, retry, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthActions from "./auth.action";


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

/**
 * Actions is one big Observable that will give you access to all dispatched actions
 * so that you can react to them.
 * NOTE!! you do not change state here
 */
@Injectable()
export class AuthEffect {

  private signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIKey;
  private signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIKey;

  //Note this actions$ is an observable but you don ot need to subscribe. NGRX will do that for you
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START), // this will react to this action only
    switchMap((authData: AuthActions.loginStart) => {
      return this.client
        .post<AuthResponseData>(
          this.signInUrl,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          map(this.handleAuthentication.bind(this)),
          catchError(this.handleError)
        )
    })
  );

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.client
        .post<AuthResponseData>(
          this.signUpUrl,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          map(this.handleAuthentication.bind(this)),
          catchError(this.handleError)
        )
    })

  );

  @Effect({ dispatch: false }) //Note this will force the action to not dispatch an event
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    }) // this will react to this action only
  )

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
    }) // this will react to this action only
  )

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: '_NULL' }; // Note you always have to return an action object with type of any dummy value
      }

      const expirationDate = new Date(userData._tokenExpirationDate);
      const loadedUSer = new User(userData.email, userData.id, userData._token, expirationDate);
      if (loadedUSer.token) {
        const expirationDuration = expirationDate.getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({ user: loadedUSer, redirect: false });
      }

      return { type: '_NULL' };
    })

  );

  //note the conversion here is to add a $ sign after the propery name
  constructor(private actions$: Actions,
    private client: HttpClient,
    private router: Router,
    private authService: AuthService) { }


  private handleAuthentication(resData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
    return new AuthActions.AuthenticateSuccess({ user: user, redirect: true });
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    let errorMessage = 'An error occured!';

    if (errorResponse.error && errorResponse.error.error) // very necessary check.. thire miht be a nework isue
    {
      console.log(errorResponse.error.error);
      switch (errorResponse.error.error.message) // note error response structure is firebase specific
      {
        case 'EMAIL_EXISTS':
          errorMessage = "Email already exists";
          break;
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_PASSWORD':
          errorMessage = 'Incorrect login details';
          break;
      }
    }

    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
}
