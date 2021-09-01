import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListAction from '../store/shopping-action';
//note follow this convention
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 @ViewChild('f', {static : false}) form: NgForm;
  editMode: boolean = false;
  subscription : Subscription;
  ingredient: Ingredient;

  constructor(private store : Store<fromApp.AppState> ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.onReset();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe( stateData => {
      if(stateData.editedIngredientIndex > -1)
      {
        this.editMode = true;
        this.ingredient = stateData.editedIngredient;
        console.log(this.ingredient);
        console.log(this.form);
        this.form.setValue({
          name : this.ingredient.name,
          amount : this.ingredient.amount
        });
      }
      else
      {
        this.editMode = false;
      }
    });
  }

  onAdditem(editForm: NgForm) :void
  {
    const name = editForm.value.name;
    const amount = editForm.value.amount;
    const ingredient = new Ingredient(name, amount);
    if(this.editMode)
    {
     this.store.dispatch(new ShoppingListAction.UpdateIngredients(ingredient));
    }
    else
    {
      this.store.dispatch(new ShoppingListAction.AddIngredient(ingredient));
    } 
    this.onReset();
  }

  onReset(): void
  {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onDelete(): void
  {
    this.store.dispatch(new ShoppingListAction.DeleteIngredients());
    this.onReset();
  }

}
