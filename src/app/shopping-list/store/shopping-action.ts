import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredient implements Action {
    readonly type: string = ADD_INGREDIENT;

    constructor(public payload : Ingredient) {}
    
}

export class AddIngredients implements Action {
    readonly type: string = ADD_INGREDIENTS;

    constructor(public payload : Array<Ingredient>) {}
    
}

export class UpdateIngredients implements Action {
    readonly type: string = UPDATE_INGREDIENT;

    constructor(public payload :  Ingredient) {}
    
}

export class DeleteIngredients implements Action {
    readonly type: string = DELETE_INGREDIENT;

    constructor() {}
    
}

export class StartEdit implements Action{
    type: string = START_EDIT;
    constructor(public payload: number) {}
    
}


export class StopEdit implements Action{
    type: string = STOP_EDIT;
    
}


//for some reasons the union type is not working in the reducer so i am casting instead!
export type ShoppingListActions = AddIngredient | AddIngredients;