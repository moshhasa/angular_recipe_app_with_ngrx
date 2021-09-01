import { Component, EventEmitter, Injectable, OnDestroy, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";

import {  Subscription } from "rxjs";
import { map } from "rxjs/operators";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from '../auth/store/auth.action';
import * as RecipeAction from '../recipes/store/recipe.action';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    userSub : Subscription;
    isAuthenticated:boolean =  false;

    constructor(private store : Store<fromApp.AppState>){}
  
   
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }


    ngOnInit(): void {
        this.userSub = this.store.select('auth')
        .pipe(
            map(userState => userState.user))
        .subscribe( user => {
            this.isAuthenticated = !user? false : true;
        });
    }

    onSaveData()
    {
        this.store.dispatch(new RecipeAction.StoreRecipes());
    }

    onFetchData()
    {
        this.store.dispatch(new RecipeAction.FetchRecipes());
    }

    onLogout()
    {
        this.store.dispatch(new AuthActions.Logout());
    }
}