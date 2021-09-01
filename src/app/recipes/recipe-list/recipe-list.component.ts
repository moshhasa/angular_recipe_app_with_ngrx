import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe>;
  subscrition: Subscription;
  private itemsFetchinSubscription: Subscription;
  fetching: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>) { }


  ngOnDestroy(): void {
     this.subscrition.unsubscribe();
    // this.itemsFetchinSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscrition = this.store.select('recipe')
      .subscribe(recipesState => {
         this.recipes = recipesState.recipes;
         this.fetching = recipesState.fetching;
         });
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

}
