import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";


export const FETCHING_START = '[Recipes] Fetching Start';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPES = '[Recipes] Add Recipes';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const SET_RECIPES = '[Recipes] Set Recipe';
export const STORE_RECIPES = '[Recipes] Store Recipes';

export class SetRecipes implements Action{
    
    readonly type: string = SET_RECIPES;
    constructor(public payload :  Recipe[]){} 
}

export class FetchingStart implements Action{
    readonly type: string = FETCHING_START;
}

export class FetchRecipes implements Action{
    readonly type: string = FETCH_RECIPES;
}

export class AddRecipe implements Action{
    readonly type: string = ADD_RECIPES;
    constructor(public payload: Recipe) {}
}

export class StoreRecipes implements Action{
    readonly type: string = ADD_RECIPES;
    constructor() {}
}

export class DeleteRecipe implements Action{
    readonly type: string = DELETE_RECIPE;

    constructor(public payload: number){}
}

export class UpdateRecipe implements Action{
    readonly type: string = UPDATE_RECIPE;

    constructor(public payload: {id : number, recipe : Recipe}){}
}
export type RecipeActions =  SetRecipes | FetchingStart | FetchRecipes;

