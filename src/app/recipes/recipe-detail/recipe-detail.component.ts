import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.action';
import * as ShoppingListAction from '../../shopping-list/store/shopping-action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = null;
  id: number;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params
      .pipe(map(params => {
        return +params['id'];
      }),
        switchMap(id => { // switch map will switch to another observable
          this.id = id;
          return this.store.select("recipe");
        }),
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            return index === this.id;
          })
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList(): void {
    this.store.dispatch(new ShoppingListAction.AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe(): void {
    if (confirm("Do you want to delete " + this.recipe.name + "?")) {
      this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
      this.router.navigate(['/recipes']);
    }
  }

}
