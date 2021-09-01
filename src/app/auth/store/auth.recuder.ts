import { User } from "../user.model";
import * as  AuthAction  from "./auth.action";

export interface UserState {
    user : User;
    authError : string;
    loading : boolean;
}


const initialState ={
    user : null,
    authError : null,
    loading : false
}

export function authReducer(state = initialState, action : AuthAction.AuthAction)
{
    switch(action.type)
    {
        case AuthAction.AUTHENTICATE_SUCCESS: 
            return {
                ...state,
                user : action.payload.user,
                authError : null,
                loading : false
            }
        case AuthAction.LOGIN_START: 
        case AuthAction.SIGNUP_START: 
            return {
                ...state,
                authError : null,
                loading : true
            }
        case AuthAction.AUTHENTICATE_FAIL: 
                return {
                    ...state,
                    user : null,
                    authError : action.payload,
                    loading : false
                }
        case AuthAction.LOGOUT : 
            return {
                ...state,
                user : null,
                loading : false
            }
        case AuthAction.CLEAR_ERROR : 
            return {
                ...state,
                authError : null
            }
        default :
            return state;
    }
}