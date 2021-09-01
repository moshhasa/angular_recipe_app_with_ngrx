import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as  ShoppingListActions from "./shopping-action";


export interface ShopingListState {
    ingredients : Ingredient[];
    editedIngredient : Ingredient,
    editedIngredientIndex: number;
}


const initialState: ShopingListState = {
    ingredients: [  new Ingredient("Apples", 5),  new Ingredient("Tomatoes", 10) ],
    editedIngredient : null,
    editedIngredientIndex : -1
}


export function shoppingListReducer(state : ShopingListState = initialState, action : Action) //Action should be using the tpye union defined in the action but not working so im casting here
{
    switch(action.type)
    {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                    ingredients : [ ...state.ingredients, (<ShoppingListActions.AddIngredient>action).payload ]
                };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients : [ ...state.ingredients, ...(<ShoppingListActions.AddIngredients>action).payload]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            
            const updateActionPayload = (<ShoppingListActions.UpdateIngredients>action).payload;
            const ingredient = state.ingredients[state.editedIngredientIndex];

            //override the changed properites in the ingredient
            const updatedIngredient = {
                ...ingredient,
                ...updateActionPayload
            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                    ...state,
                    ingredients : updatedIngredients,
                    editedIngredientIndex : -1,
                    editedIngredient :  null
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients : state.ingredients.filter( (ingredient, index) => {
                    return index != state.editedIngredientIndex;
                })
            }
        case ShoppingListActions.START_EDIT:
            const startEditActionPayload = (<ShoppingListActions.StartEdit>action).payload;
            return {
                ...state,
                editedIngredientIndex : startEditActionPayload,
                editedIngredient :  state.ingredients[startEditActionPayload] 
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex : -1,
                editedIngredient: null
            }
        default :
         return state; // return the default state 
    }
}