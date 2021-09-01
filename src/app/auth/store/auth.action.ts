import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN_START = '[Auth] Login Start'
export const AUTHENTICATE_FAIL = '[Auth] Login Fail'
export const AUTHENTICATE_SUCCESS ='[Auth] Login';
export const LOGOUT ='[Auth] Logut';
export const SIGNUP_START ='[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(public payload : {user : User, redirect : boolean}) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class loginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {email : string, password : string}){}
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload : string){}
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: {email : string, password : string}){}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthAction = 
    AuthenticateSuccess |
    Logout |
    loginStart | 
    AuthenticateFail | 
    SignupStart | 
    ClearError |
    AutoLogin;

