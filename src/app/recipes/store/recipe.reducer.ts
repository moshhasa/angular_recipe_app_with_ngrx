import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as RecipeActions  from "./recipe.action";

export interface RecipeState {
    recipes: Array<Recipe>;
    fetching : boolean;
}

const initialState =  {
    recipes: [],
    fetching : false
}


export function recipeReducer(state = initialState, action : Action)
{
    switch(action.type)
    {
        case RecipeActions.SET_RECIPES :
            return {
                ...state,
                fetching : false,
                recipes : [...(<RecipeActions.SetRecipes>action).payload]
            }
        case RecipeActions.ADD_RECIPES :
            return {
                ...state,
                recipes : [...state.recipes, (<RecipeActions.AddRecipe>action).payload]
            }
        case RecipeActions.UPDATE_RECIPE :
            const updateRecipePayload = (<RecipeActions.UpdateRecipe>action).payload;
            const oldRecipe = state.recipes[updateRecipePayload.id];
            const updatedRecipe = {
                ...oldRecipe,
                ...updateRecipePayload.recipe
            }

            const updatedRecipes = [...state.recipes];
            updatedRecipes[updateRecipePayload.id] = updatedRecipe;

                return {
                    ...state,
                    recipes : updatedRecipes
                }
        case RecipeActions.DELETE_RECIPE :

                return {
                    ...state,
                    fetching : false,
                    recipes : state.recipes.filter( (recipe, index) => {
                        return index !== (<RecipeActions.DeleteRecipe>action).payload;
                    })
                }
        case RecipeActions.FETCHING_START :
          return {
            ...state,
            recipes : state.recipes,
            fetching : true
        }
        default :
            return state;
    }

}
