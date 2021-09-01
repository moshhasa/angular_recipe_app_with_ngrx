import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { dispatch } from "rxjs/internal/observable/pairs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import * as fromApp from "src/app/store/app.reducer";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.action';

@Injectable({providedIn : 'root'})
export class RecipesEffects{


    private url = "https://ng-course-recipe-e12d7-default-rtdb.firebaseio.com/recipes.json";

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap( () => {
            this.store.dispatch(new RecipesActions.FetchingStart());
            return this.client.get<Array<Recipe>>(this.url);
        }),
        map(recipes => { //pipe to ensure we always have ingredient array which is optional
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
            });
        }),
        map(recipes => new RecipesActions.SetRecipes(recipes))

    );

    @Effect({dispatch : false})
    storeRecipe = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipe')),
        switchMap( ([actionData, recipesState]) => {
            return this.client.put(this.url,  recipesState.recipes);
        })
    );


    constructor(private actions$ : Actions,
                private client : HttpClient,
                private store : Store<fromApp.AppState>) {}
}
