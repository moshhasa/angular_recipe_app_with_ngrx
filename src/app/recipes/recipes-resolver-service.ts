import {  Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import * as  fromApp  from "../store/app.reducer";
import { Recipe } from "./recipe.model";
import * as  RecipeActions  from "./store/recipe.action";

@Injectable({providedIn : 'root'})
export class RecipeResolverService implements Resolve<Array<Recipe>> {

    constructor(private store : Store<fromApp.AppState>,  private actions$ : Actions){}


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Array<Recipe> | Observable<Array<Recipe>> | Promise<Array<Recipe>> {
       
       return this.store.select("recipe")
       .pipe(
           take(1),
           map(recipesState => recipesState.recipes),
           switchMap(recipes => {
                if(recipes.length === 0)
                {
                    //NOTE resovle() expects to return an obervable. dispacthing action does not return an observable
                    // so we need to wait till the recipes to be
                     this.store.dispatch(new RecipeActions.FetchRecipes())
                     return this.actions$.pipe(
                        ofType(RecipeActions.SET_RECIPES),
                         take(1)
                    )
                }
                else
                {
                    return of(recipes);
                }
           })

       )
   
      
    }

}