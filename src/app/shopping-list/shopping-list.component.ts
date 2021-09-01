import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
//note follow this convention
import * as fromApp from '../store/app.reducer';
import * as ShoppingListAction from './store/shopping-action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100px)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100px)' }))
      ])
    ])
  ]
})

export class ShoppingListComponent implements OnInit {

  ingredients:Observable<{ ingredients : Ingredient[] }>;


  constructor(private store : Store<fromApp.AppState>)
  { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }


  onEditItem(index: number) :void {
    this.store.dispatch(new ShoppingListAction.StartEdit(index));
  }


}
