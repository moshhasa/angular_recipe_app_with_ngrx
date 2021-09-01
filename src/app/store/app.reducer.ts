import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.recuder';
import * as fromRecipe from '../recipes/store/recipe.reducer';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';


export interface  AppState{
    auth : fromAuth.UserState,
    shoppingList : fromShoppingList.ShopingListState,
    recipe : fromRecipe.RecipeState
}

export const appReducer : ActionReducerMap<AppState> = {
    shoppingList : fromShoppingList.shoppingListReducer,
    auth : fromAuth.authReducer,
    recipe : fromRecipe.recipeReducer
} 